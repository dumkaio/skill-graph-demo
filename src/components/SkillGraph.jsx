import { useEffect, useMemo, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { LEVELS, getLevelCategory, skillData } from '../data/skillsData';
import './SkillGraph.css';

const CLOUD_LAYERS = [
  { id: 'a', dx: -0.14, dy: 0.06, scale: 1.05, opacity: 0.18 },
  { id: 'b', dx: 0.15, dy: -0.11, scale: 1.2, opacity: 0.15 },
  { id: 'c', dx: 0.09, dy: 0.14, scale: 0.92, opacity: 0.13 }
];

function buildElements() {
  const elements = [];
  const clusterSkillMap = {};

  elements.push({ data: { id: 'user', label: 'Full Stack Developer', type: 'user' } });

  Object.entries(skillData).forEach(([clusterId, cluster]) => {
    clusterSkillMap[clusterId] = [];
    elements.push({ data: { id: clusterId, label: cluster.label, type: 'cluster' } });
    elements.push({ data: { source: 'user', target: clusterId, type: 'user-cluster' } });

    cluster.skills.forEach((skill) => {
      clusterSkillMap[clusterId].push(skill.level);
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
  });

  Object.entries(clusterSkillMap).forEach(([clusterId, levels]) => {
    const values = levels.map((l) => LEVELS[l].value).sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    const median = values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];

    let closestLevel = 'intermediate_2';
    let closestDiff = Infinity;
    Object.entries(LEVELS).forEach(([key, data]) => {
      const diff = Math.abs(data.value - median);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestLevel = key;
      }
    });

    const clusterNode = elements.find((e) => e.data.id === clusterId);
    clusterNode.data.medianLevel = closestLevel;
    clusterNode.data.skillCount = levels.length;

  });

  return elements;
}

export default function SkillGraph() {
  const graphRef = useRef(null);
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const searchRef = useRef('');
  const [search, setSearch] = useState('');
  const [hoverClusterId, setHoverClusterId] = useState(null);
  const [clouds, setClouds] = useState([]);
  const [hovered, setHovered] = useState('Hover over a node');
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: '',
    level: '',
    cluster: '',
    levelClass: ''
  });

  const elements = useMemo(() => buildElements(), []);

  const stats = useMemo(() => {
    const counters = { total: 0, beginner: 0, intermediate: 0, expert: 0 };
    elements.forEach((el) => {
      if (el.data.type === 'skill') {
        counters.total += 1;
        counters[getLevelCategory(el.data.level)] += 1;
      }
    });
    return counters;
  }, [elements]);

  useEffect(() => {
    if (!containerRef.current) return;

    const layoutConfig = {
      name: 'cose',
      animate: false,
      nodeRepulsion: 450000,
      idealEdgeLength: (edge) => (edge.data('type') === 'user-cluster' ? 360 : 76),
      edgeElasticity: (edge) => (edge.data('type') === 'user-cluster' ? 180 : 50),
      numIter: 2200,
      padding: 100
    };

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      wheelSensitivity: 0.25,
      style: [
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
            width: 120,
            height: 120,
            'background-color': '#111827',
            color: '#ffffff',
            'font-size': 13,
            'font-weight': 700,
            'text-valign': 'center',
            'text-margin-y': 0,
            'border-color': '#4ceab1',
            'border-width': 4
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
      ],
      layout: { name: 'preset' }
    });

    const updateCloudOverlays = () => {
      const clusterIds = Object.keys(skillData);
      const centers = clusterIds
        .map((clusterId) => {
          const n = cy.$id(clusterId);
          if (n.empty()) return null;
          return { clusterId, pos: n.renderedPosition(), node: n };
        })
        .filter(Boolean);

      const nextClouds = centers.flatMap(({ clusterId, pos, node }) => {
        const skillNodes = cy.nodes(`[cluster="${clusterId}"]`);
        let maxDistance = 0;
        skillNodes.forEach((skillNode) => {
          const sp = skillNode.renderedPosition();
          const d = Math.hypot(sp.x - pos.x, sp.y - pos.y);
          if (d > maxDistance) maxDistance = d;
        });

        let nearestClusterDistance = Infinity;
        centers.forEach((other) => {
          if (other.clusterId === clusterId) return;
          const d = Math.hypot(other.pos.x - pos.x, other.pos.y - pos.y);
          if (d < nearestClusterDistance) nearestClusterDistance = d;
        });

        const naturalSize = Math.max(240, maxDistance * 2.0);
        const spacingCap = Number.isFinite(nearestClusterDistance)
          ? nearestClusterDistance * 0.95
          : naturalSize;
        const baseSize = Math.min(naturalSize, spacingCap);

        const level = node.data('medianLevel');
        const color = LEVELS[level]?.color || '#cfe5ff';
        return CLOUD_LAYERS.map((layer) => ({
          id: `${clusterId}-${layer.id}`,
          clusterId,
          color,
          opacity: layer.opacity,
          left: pos.x + baseSize * layer.dx,
          top: pos.y + baseSize * layer.dy,
          size: baseSize * layer.scale
        }));
      });
      setClouds(nextClouds);
    };

    const setTooltipFromNode = (node, event) => {
      const data = node.data();
      const x = event.originalEvent?.clientX ?? 0;
      const y = event.originalEvent?.clientY ?? 0;

      if (data.type === 'skill') {
        const level = LEVELS[data.level];
        setHovered(`${data.label} - ${level.name} T${level.tier} - ${data.clusterLabel}`);
        setTooltip({
          visible: true,
          x: x + 15,
          y: y + 15,
          title: data.label,
          level: `${level.name} (Tier ${level.tier})`,
          cluster: `Domain: ${data.clusterLabel}`,
          levelClass: getLevelCategory(data.level)
        });
        return;
      }

      if (data.type === 'cluster') {
        const level = LEVELS[data.medianLevel];
        setHovered(`${data.label} - ${data.skillCount} skills`);
        setTooltip({
          visible: true,
          x: x + 15,
          y: y + 15,
          title: data.label,
          level: `Median: ${level.name} (Tier ${level.tier})`,
          cluster: `${data.skillCount} skills in this domain`,
          levelClass: getLevelCategory(data.medianLevel)
        });
        return;
      }

      setHovered(`${data.label} - ${stats.total} skills`);
      setTooltip({
        visible: true,
        x: x + 15,
        y: y + 15,
        title: data.label,
        level: '',
        cluster: `${stats.total} skills across ${Object.keys(skillData).length} domains`,
        levelClass: ''
      });
    };

    cyRef.current = cy;
    const layout = cy.layout(layoutConfig);
    layout.run();

    cy.on('layoutstop', () => {
      updateCloudOverlays();
    });
    cy.on('render', updateCloudOverlays);
    cy.on('zoom pan resize', updateCloudOverlays);

    cy.on('mouseover', 'node', (e) => {
      setTooltipFromNode(e.target, e);
      const data = e.target.data();
      e.target.addClass('highlighted');

      if (searchRef.current || data.type !== 'cluster') {
        if (data.type !== 'cluster') {
          setHoverClusterId(null);
        }
        return;
      }

      setHoverClusterId(data.id);
      const clusterId = e.target.id();
      const clusterSkills = cy.nodes(`[cluster="${clusterId}"]`);
      const clusterWithSkills = clusterSkills.add(e.target);
      const userNode = cy.$id('user');
      const userEdge = cy.edges(`[source="user"][target="${clusterId}"]`);
      const skillEdges = clusterSkills.connectedEdges();

      cy.elements().addClass('faded');
      clusterWithSkills.removeClass('faded');
      userNode.removeClass('faded');
      userEdge.removeClass('faded').addClass('highlighted');
      skillEdges.removeClass('faded');
    });

    cy.on('mousemove', 'node', (e) => {
      setTooltip((prev) => ({ ...prev, x: e.originalEvent.clientX + 15, y: e.originalEvent.clientY + 15 }));
    });

    cy.on('mouseout', 'node', (e) => {
      setTooltip((prev) => ({ ...prev, visible: false }));
      setHovered('Hover over a node');
      e.target.removeClass('highlighted');
      setHoverClusterId(null);

      if (searchRef.current || e.target.data('type') !== 'cluster') {
        return;
      }

      cy.elements().removeClass('faded highlighted');
    });

    cy.on('drag free', 'node[type="cluster"]', updateCloudOverlays);
    cy.ready(updateCloudOverlays);

    return () => {
      cy.destroy();
      cyRef.current = null;
      setClouds([]);
    };
  }, [elements, stats.total]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    const query = search.trim().toLowerCase();
    searchRef.current = query;
    cy.elements().removeClass('faded search-match highlighted');
    if (!query) return;

    const matches = cy.nodes().filter((n) => (n.data('label') || '').toLowerCase().includes(query));
    if (matches.length === 0) return;

    cy.elements().addClass('faded');
    matches.removeClass('faded').addClass('search-match');
    matches.connectedEdges().removeClass('faded');

    matches.forEach((node) => {
      if (node.data('type') === 'skill') {
        cy.$id(node.data('cluster')).removeClass('faded');
        cy.$id('user').removeClass('faded');
      }
    });
  }, [search]);

  const zoomIn = () => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.zoom({ level: cy.zoom() * 1.2, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
  };

  const zoomOut = () => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.zoom({ level: cy.zoom() / 1.2, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
  };

  const fit = () => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.elements().removeClass('faded search-match highlighted');
    searchRef.current = '';
    setSearch('');
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
        <button onClick={fit} type="button">Reset</button>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills"
        />
      </div>

      <div className="skill-graph" ref={graphRef}>
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
