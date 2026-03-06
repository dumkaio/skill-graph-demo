import { useEffect, useMemo, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { LEVELS, getLevelCategory, skillData } from '../data/skillsData';
import './SkillGraph.css';

const USER_NODE_ID = 'user';
const DEFAULT_HOVER_TEXT = 'Hover over a node';
const USER_PROFILE = {
  name: 'Alex Johnson',
  title: 'Full Stack Developer',
  location: 'Helsinki',
  years: 8
};

const CLOUD_LAYERS = [
  { id: 'a', dx: -0.14, dy: 0.06, scale: 1.05, opacity: 0.18 },
  { id: 'b', dx: 0.15, dy: -0.11, scale: 1.2, opacity: 0.15 },
  { id: 'c', dx: 0.09, dy: 0.14, scale: 0.92, opacity: 0.13 }
];

const DRAG_MOTION = {
  amplitude: 7,
  settleMs: 300,
  spring: 0.11,
  damping: 0.82
};

const LAYOUT_CONFIG = {
  name: 'cose',
  animate: false,
  nodeRepulsion: 450000,
  idealEdgeLength: (edge) => (edge.data('type') === 'user-cluster' ? 360 : 76),
  edgeElasticity: (edge) => (edge.data('type') === 'user-cluster' ? 180 : 50),
  numIter: 2200,
  padding: 100
};

function closestLevelForMedian(levels) {
  const values = levels.map((level) => LEVELS[level].value).sort((a, b) => a - b);
  const middle = Math.floor(values.length / 2);
  const median = values.length % 2 === 0
    ? (values[middle - 1] + values[middle]) / 2
    : values[middle];

  let closestLevel = 'intermediate_2';
  let smallestDiff = Infinity;
  Object.entries(LEVELS).forEach(([levelKey, levelMeta]) => {
    const diff = Math.abs(levelMeta.value - median);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestLevel = levelKey;
    }
  });
  return closestLevel;
}

function buildGraphModel(data) {
  const elements = [
    { data: { id: USER_NODE_ID, label: 'Full Stack Developer', type: 'user' } }
  ];
  const clusterIds = [];

  Object.entries(data).forEach(([clusterId, cluster]) => {
    clusterIds.push(clusterId);
    const levels = [];

    elements.push({ data: { id: clusterId, label: cluster.label, type: 'cluster' } });
    elements.push({ data: { source: USER_NODE_ID, target: clusterId, type: 'user-cluster' } });

    cluster.skills.forEach((skill) => {
      levels.push(skill.level);
      elements.push({
        data: {
          id: skill.id,
          label: skill.label,
          level: skill.level,
          cluster: clusterId,
          clusterLabel: cluster.label,
          type: 'skill'
        }
      });
      elements.push({ data: { source: clusterId, target: skill.id, type: 'cluster-skill' } });
    });

    const medianLevel = closestLevelForMedian(levels);
    const clusterNode = elements.find((element) => element.data.id === clusterId);
    clusterNode.data.medianLevel = medianLevel;
    clusterNode.data.skillCount = levels.length;
  });

  return { elements, clusterIds };
}

function computeStats(elements) {
  const counters = { total: 0, beginner: 0, intermediate: 0, expert: 0 };
  elements.forEach((element) => {
    if (element.data.type !== 'skill') return;
    counters.total += 1;
    counters[getLevelCategory(element.data.level)] += 1;
  });
  return counters;
}

function createStyles() {
  return [
    {
      selector: 'node',
      style: {
        label: 'data(label)',
        'font-size': 9,
        'font-family': 'system-ui, sans-serif',
        'text-wrap': 'wrap',
        'text-max-width': 80,
        'text-valign': 'bottom',
        'text-margin-y': 6,
        'overlay-opacity': 0
      }
    },
    {
      selector: 'node[type="user"]',
      style: {
        // Invisible anchor node with large footprint so layout keeps space for HTML card.
        width: 660,
        height: 360,
        'background-color': '#000000',
        'background-opacity': 0,
        color: '#ffffff00',
        'font-size': 1,
        'text-opacity': 0,
        'border-width': 0
      }
    },
    {
      selector: 'node[type="cluster"]',
      style: {
        shape: 'hexagon',
        width: 90,
        height: 90,
        'background-color': '#cfe5ff',
        'background-opacity': 1,
        'border-color': '#90b7dd',
        'border-width': 2,
        'font-weight': 600,
        'font-size': 10,
        color: '#1e3a5f',
        'text-valign': 'center',
        'text-margin-y': 0
      }
    },
    {
      selector: 'node[type="skill"]',
      style: {
        width: (node) => LEVELS[node.data('level')].size,
        height: (node) => LEVELS[node.data('level')].size,
        'background-color': (node) => LEVELS[node.data('level')].color,
        color: '#111827'
      }
    },
    {
      selector: 'edge[type="user-cluster"]',
      style: {
        width: 2,
        'line-color': '#8bb8e8',
        opacity: 0.5
      }
    },
    {
      selector: 'edge[type="cluster-skill"]',
      style: {
        width: 1,
        'line-color': '#d1d5db',
        opacity: 0.35
      }
    },
    { selector: '.highlighted', style: { 'overlay-color': '#4ceab1', 'overlay-opacity': 0.2 } },
    { selector: 'edge.highlighted', style: { width: 2, opacity: 0.8, 'line-color': '#4ceab1' } },
    { selector: '.faded', style: { opacity: 0.12 } },
    { selector: '.search-match', style: { 'overlay-color': '#f8d247', 'overlay-opacity': 0.25 } }
  ];
}

function getTooltipPayload(nodeData, totalSkills, clusterCount) {
  if (nodeData.type === 'skill') {
    const level = LEVELS[nodeData.level];
    return {
      title: nodeData.label,
      level: `${level.name} (Tier ${level.tier})`,
      cluster: `Domain: ${nodeData.clusterLabel}`,
      levelClass: getLevelCategory(nodeData.level),
      hoverText: `${nodeData.label} - ${level.name} T${level.tier} - ${nodeData.clusterLabel}`
    };
  }

  if (nodeData.type === 'cluster') {
    const level = LEVELS[nodeData.medianLevel];
    return {
      title: nodeData.label,
      level: `Median: ${level.name} (Tier ${level.tier})`,
      cluster: `${nodeData.skillCount} skills in this domain`,
      levelClass: getLevelCategory(nodeData.medianLevel),
      hoverText: `${nodeData.label} - ${nodeData.skillCount} skills`
    };
  }

  return {
    title: nodeData.label,
    level: '',
    cluster: `${totalSkills} skills across ${clusterCount} domains`,
    levelClass: '',
    hoverText: `${nodeData.label} - ${totalSkills} skills`
  };
}

function computeCloudOverlays(cy, clusterIds) {
  const centers = clusterIds
    .map((clusterId) => {
      const node = cy.$id(clusterId);
      if (node.empty()) return null;
      return {
        clusterId,
        node,
        position: node.renderedPosition()
      };
    })
    .filter(Boolean);

  return centers.flatMap(({ clusterId, node, position }) => {
    const skills = cy.nodes(`[cluster="${clusterId}"]`);
    let farthestSkillDistance = 0;
    skills.forEach((skillNode) => {
      const p = skillNode.renderedPosition();
      const distance = Math.hypot(p.x - position.x, p.y - position.y);
      if (distance > farthestSkillDistance) farthestSkillDistance = distance;
    });

    let nearestClusterDistance = Infinity;
    centers.forEach((other) => {
      if (other.clusterId === clusterId) return;
      const distance = Math.hypot(other.position.x - position.x, other.position.y - position.y);
      if (distance < nearestClusterDistance) nearestClusterDistance = distance;
    });

    const naturalSize = Math.max(240, farthestSkillDistance * 2.0);
    const cappedSize = Number.isFinite(nearestClusterDistance)
      ? Math.min(naturalSize, nearestClusterDistance * 0.95)
      : naturalSize;

    const level = node.data('medianLevel');
    const color = LEVELS[level]?.color || '#cfe5ff';

    return CLOUD_LAYERS.map((layer) => ({
      id: `${clusterId}-${layer.id}`,
      clusterId,
      color,
      opacity: layer.opacity,
      left: position.x + cappedSize * layer.dx,
      top: position.y + cappedSize * layer.dy,
      size: cappedSize * layer.scale
    }));
  });
}

export default function SkillGraph() {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const searchRef = useRef('');

  const [search, setSearch] = useState('');
  const [hoverClusterId, setHoverClusterId] = useState(null);
  const [clouds, setClouds] = useState([]);
  const [userCardPosition, setUserCardPosition] = useState({ x: 0, y: 0, zoom: 1 });
  const [hovered, setHovered] = useState(DEFAULT_HOVER_TEXT);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: '',
    level: '',
    cluster: '',
    levelClass: ''
  });

  const model = useMemo(() => buildGraphModel(skillData), []);
  const stats = useMemo(() => computeStats(model.elements), [model.elements]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: model.elements,
      wheelSensitivity: 0.25,
      style: createStyles(),
      layout: { name: 'preset' }
    });

    const refreshClouds = () => {
      setClouds(computeCloudOverlays(cy, model.clusterIds));
    };

    const refreshUserCard = () => {
      const userNode = cy.$id(USER_NODE_ID);
      if (userNode.empty()) return;
      const position = userNode.renderedPosition();
      setUserCardPosition({ x: position.x, y: position.y, zoom: cy.zoom() });
    };

    const applyClusterFocus = (clusterId) => {
      const clusterNode = cy.$id(clusterId);
      const clusterSkills = cy.nodes(`[cluster="${clusterId}"]`);
      const userNode = cy.$id(USER_NODE_ID);
      const userEdge = cy.edges(`[source="${USER_NODE_ID}"][target="${clusterId}"]`);
      const skillEdges = clusterSkills.connectedEdges();

      cy.elements().addClass('faded');
      clusterSkills.add(clusterNode).removeClass('faded');
      userNode.removeClass('faded');
      userEdge.removeClass('faded').addClass('highlighted');
      skillEdges.removeClass('faded');
    };

    const clearFocus = () => {
      cy.elements().removeClass('faded highlighted');
      setHoverClusterId(null);
    };

    const clusterDragOffsets = new Map();
    const dragMotion = {
      rafId: null,
      clusterId: null,
      dragging: false,
      settleUntil: 0,
      lastTs: 0,
      prevClusterX: 0,
      prevClusterY: 0
    };

    const stopMotionLoop = () => {
      if (dragMotion.rafId) {
        cancelAnimationFrame(dragMotion.rafId);
        dragMotion.rafId = null;
      }
    };

    const motionFrame = (ts) => {
      if (!dragMotion.clusterId) {
        stopMotionLoop();
        return;
      }

      const clusterNode = cy.$id(dragMotion.clusterId);
      if (clusterNode.empty()) {
        stopMotionLoop();
        return;
      }

      const clusterPos = clusterNode.position();
      if (!dragMotion.lastTs) {
        dragMotion.lastTs = ts;
        dragMotion.prevClusterX = clusterPos.x;
        dragMotion.prevClusterY = clusterPos.y;
      }

      const dt = Math.max(0.016, Math.min(0.04, (ts - dragMotion.lastTs) / 1000));
      const cvx = (clusterPos.x - dragMotion.prevClusterX) / dt;
      const cvy = (clusterPos.y - dragMotion.prevClusterY) / dt;
      const speed = Math.hypot(cvx, cvy);
      const dirX = speed > 0.001 ? cvx / speed : 1;
      const dirY = speed > 0.001 ? cvy / speed : 0;
      const perpX = -dirY;
      const perpY = dirX;

      const settling = !dragMotion.dragging;
      const settleProgress = settling
        ? Math.max(0, (dragMotion.settleUntil - performance.now()) / DRAG_MOTION.settleMs)
        : 1;

      const skills = cy.nodes(`[cluster="${dragMotion.clusterId}"]`);
      skills.forEach((skill) => {
        const state = clusterDragOffsets.get(skill.id());
        if (!state) return;

        const baseX = clusterPos.x + state.dx;
        const baseY = clusterPos.y + state.dy;
        const wave = Math.sin(ts * 0.012 + state.phase);
        const wave2 = Math.cos(ts * 0.009 + state.phase * 1.2);
        const wobbleAmp = DRAG_MOTION.amplitude * (0.5 + Math.min(1, speed / 450)) * settleProgress;
        const wobbleX = (perpX * wave + dirX * wave2 * 0.45) * wobbleAmp;
        const wobbleY = (perpY * wave + dirY * wave2 * 0.45) * wobbleAmp;
        const targetX = baseX + wobbleX;
        const targetY = baseY + wobbleY;

        const p = skill.position();
        state.vx = state.vx * DRAG_MOTION.damping + (targetX - p.x) * DRAG_MOTION.spring;
        state.vy = state.vy * DRAG_MOTION.damping + (targetY - p.y) * DRAG_MOTION.spring;

        skill.position({
          x: p.x + state.vx,
          y: p.y + state.vy
        });
      });

      dragMotion.lastTs = ts;
      dragMotion.prevClusterX = clusterPos.x;
      dragMotion.prevClusterY = clusterPos.y;

      if (dragMotion.dragging || performance.now() < dragMotion.settleUntil) {
        dragMotion.rafId = requestAnimationFrame(motionFrame);
      } else {
        // Final hard snap to exact anchored positions after settle window.
        skills.forEach((skill) => {
          const state = clusterDragOffsets.get(skill.id());
          if (!state) return;
          skill.position({
            x: clusterPos.x + state.dx,
            y: clusterPos.y + state.dy
          });
        });
        clusterDragOffsets.clear();
        dragMotion.clusterId = null;
        stopMotionLoop();
      }
    };

    cyRef.current = cy;
    cy.layout(LAYOUT_CONFIG).run();
    cy.nodes('[type="skill"], [type="user"]').ungrabify();

    cy.on('layoutstop', refreshClouds);
    cy.on('layoutstop', refreshUserCard);
    cy.on('zoom pan resize', refreshClouds);
    cy.on('zoom pan resize', refreshUserCard);
    cy.on('drag free', 'node[type="cluster"]', refreshClouds);
    cy.on('drag free', 'node[type="cluster"]', refreshUserCard);
    cy.ready(refreshClouds);
    cy.ready(refreshUserCard);

    cy.on('grab', 'node[type="cluster"]', (event) => {
      const cluster = event.target;
      const clusterId = cluster.id();
      const clusterPosition = cluster.position();
      const skills = cy.nodes(`[cluster="${clusterId}"]`);

      clusterDragOffsets.clear();
      skills.forEach((skill) => {
        const skillPosition = skill.position();
        clusterDragOffsets.set(skill.id(), {
          dx: skillPosition.x - clusterPosition.x,
          dy: skillPosition.y - clusterPosition.y,
          vx: 0,
          vy: 0,
          phase: skill.id().charCodeAt(skill.id().length - 1) * 0.19
        });
      });

      dragMotion.clusterId = clusterId;
      dragMotion.dragging = true;
      dragMotion.settleUntil = 0;
      dragMotion.lastTs = 0;
      dragMotion.prevClusterX = clusterPosition.x;
      dragMotion.prevClusterY = clusterPosition.y;
      stopMotionLoop();
      dragMotion.rafId = requestAnimationFrame(motionFrame);
    });

    cy.on('free', 'node[type="cluster"]', (event) => {
      const cluster = event.target;
      const clusterId = cluster.id();
      if (dragMotion.clusterId !== clusterId) return;
      dragMotion.dragging = false;
      dragMotion.settleUntil = performance.now() + DRAG_MOTION.settleMs;
    });

    cy.on('mouseover', 'node', (event) => {
      const node = event.target;
      const data = node.data();
      const payload = getTooltipPayload(data, stats.total, model.clusterIds.length);

      node.addClass('highlighted');
      setHovered(payload.hoverText);
      setTooltip({
        visible: true,
        x: (event.originalEvent?.clientX ?? 0) + 15,
        y: (event.originalEvent?.clientY ?? 0) + 15,
        title: payload.title,
        level: payload.level,
        cluster: payload.cluster,
        levelClass: payload.levelClass
      });

      if (searchRef.current || data.type !== 'cluster') {
        if (data.type !== 'cluster') setHoverClusterId(null);
        return;
      }

      setHoverClusterId(data.id);
      applyClusterFocus(data.id);
    });

    cy.on('mousemove', 'node', (event) => {
      setTooltip((prev) => ({
        ...prev,
        x: (event.originalEvent?.clientX ?? 0) + 15,
        y: (event.originalEvent?.clientY ?? 0) + 15
      }));
    });

    cy.on('mouseout', 'node', (event) => {
      event.target.removeClass('highlighted');
      setTooltip((prev) => ({ ...prev, visible: false }));
      setHovered(DEFAULT_HOVER_TEXT);

      if (!searchRef.current && event.target.data('type') === 'cluster') {
        clearFocus();
      } else {
        setHoverClusterId(null);
      }
    });

    return () => {
      stopMotionLoop();
      cy.destroy();
      cyRef.current = null;
      setClouds([]);
    };
  }, [model, stats.total]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    const query = search.trim().toLowerCase();
    searchRef.current = query;
    cy.elements().removeClass('faded search-match highlighted');

    if (!query) return;

    const matches = cy.nodes().filter((node) => {
      const label = node.data('label') || '';
      return label.toLowerCase().includes(query);
    });

    if (matches.length === 0) return;

    cy.elements().addClass('faded');
    matches.removeClass('faded').addClass('search-match');
    matches.connectedEdges().removeClass('faded');

    const focusElements = matches.union(matches.connectedEdges());
    matches.forEach((node) => {
      if (node.data('type') === 'skill') {
        cy.$id(node.data('cluster')).removeClass('faded');
        cy.$id(USER_NODE_ID).removeClass('faded');
        focusElements.merge(cy.$id(node.data('cluster')));
        focusElements.merge(cy.$id(USER_NODE_ID));
      }
    });

    cy.animate({
      fit: {
        eles: focusElements,
        padding: 120
      },
      duration: 260,
      easing: 'ease-out-cubic'
    });
  }, [search]);

  const zoomIn = () => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.zoom({
      level: cy.zoom() * 1.2,
      renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 }
    });
  };

  const zoomOut = () => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.zoom({
      level: cy.zoom() / 1.2,
      renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 }
    });
  };

  const resetView = () => {
    const cy = cyRef.current;
    if (!cy) return;

    searchRef.current = '';
    setSearch('');
    setHoverClusterId(null);
    cy.elements().removeClass('faded search-match highlighted');
    cy.fit(undefined, 70);
  };

  return (
    <section className="skill-graph-shell">
      <header className="topbar">
        <h1>Skill Observatory</h1>
        <div className="stats">
          <span>Total: {stats.total}</span>
          <span>Beginner: {stats.beginner}</span>
          <span>Intermediate: {stats.intermediate}</span>
          <span>Expert: {stats.expert}</span>
        </div>
      </header>

      <div className="tools">
        <button onClick={zoomIn} type="button">+</button>
        <button onClick={zoomOut} type="button">-</button>
        <button onClick={resetView} type="button">Reset</button>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search skills"
        />
      </div>

      <div className="skill-graph">
        <div className="smoke-layer">
          {clouds.map((cloud) => {
            const faded = hoverClusterId && hoverClusterId !== cloud.clusterId;
            const seed = cloud.id.charCodeAt(cloud.id.length - 1) % 9;

            return (
              <span
                key={cloud.id}
                className={`smoke-blob ${faded ? 'smoke-faded' : ''}`}
                style={{
                  left: cloud.left,
                  top: cloud.top,
                  width: cloud.size,
                  height: cloud.size * 0.68,
                  backgroundColor: cloud.color,
                  opacity: faded ? 0.03 : cloud.opacity,
                  '--rot': `${-16 + seed * 4}deg`
                }}
              />
            );
          })}
        </div>
        <div
          className="user-card-overlay"
          style={{
            left: userCardPosition.x,
            top: userCardPosition.y,
            transform: `translate(-50%, -50%) scale(${userCardPosition.zoom})`
          }}
        >
          <div className="user-card-name">{USER_PROFILE.name}</div>
          <div className="user-card-title">{USER_PROFILE.title}</div>
          <div className="user-card-meta">
            <span>{USER_PROFILE.location}</span>
            <span>{USER_PROFILE.years} yrs exp</span>
          </div>
          <div className="user-card-stats">
            <span>{stats.total} skills</span>
            <span>{model.clusterIds.length} domains</span>
          </div>
        </div>
        <div ref={containerRef} className="skill-graph-canvas" />
      </div>

      <div
        className={`tooltip ${tooltip.visible ? 'visible' : ''}`}
        style={{ left: tooltip.x, top: tooltip.y }}
      >
        <div className="tooltip-title">{tooltip.title}</div>
        {tooltip.level ? <div className={`tooltip-level ${tooltip.levelClass}`}>{tooltip.level}</div> : null}
        <div className="tooltip-cluster">{tooltip.cluster}</div>
      </div>

      <footer className="hover-info">{hovered}</footer>
    </section>
  );
}
