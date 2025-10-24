import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDarkMode } from './DarkModeProvider';

type NodeSize = 'small' | 'medium' | 'large';
type DepthLayer = 'back' | 'mid' | 'front';

interface PatentNode {
  id: number;
  x: number;
  y: number;
  z: number;
  size: NodeSize;
  layer: DepthLayer;
  cluster: number;
  title: string;
  neighbors: number[];
}

interface Edge {
  from: number;
  to: number;
}

interface SpotlightState {
  nodeId: number | null;
  progress: number;
}

const PATENT_TITLES = [
  'Method to produce an additively manufactured graded composite transition joint',
  'Advanced neural network architecture for real-time processing',
  'Sustainable energy storage system with enhanced efficiency',
  'Quantum computing error correction methodology',
  'Biodegradable polymer composite with enhanced durability',
  'Machine learning optimization for industrial automation',
  'CRISPR-based gene editing precision tool',
  'Carbon capture and utilization process',
  'Advanced battery cell thermal management',
  'Novel semiconductor manufacturing technique',
  'Optical sensor array for autonomous systems',
  'High-frequency communication protocol',
];

export function PatentConstellationHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<PatentNode[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [spotlightState, setSpotlightState] = useState<SpotlightState>({ nodeId: null, progress: 0 });
  const [displayTitle, setDisplayTitle] = useState<string>('');
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const [canStartSpotlight, setCanStartSpotlight] = useState(false);
  const [glowProgress, setGlowProgress] = useState<number>(0);
  const lastSpotlightTime = useRef<number>(0);
  const orbitAngle = useRef<number>(0);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoverTimeout = useRef<number>();
  const spotlightTimeout = useRef<number>();
  const isPaused = useRef<boolean>(false);
  const { isDark } = useDarkMode();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initial load timing
  useEffect(() => {
    // Show graph after 1 second
    const graphTimer = setTimeout(() => {
      setIsGraphVisible(true);
    }, 1000);

    // Allow spotlight to start after 1.5 seconds total (1s for graph + 0.5s delay)
    const spotlightTimer = setTimeout(() => {
      setCanStartSpotlight(true);
    }, 1500);

    return () => {
      clearTimeout(graphTimer);
      clearTimeout(spotlightTimer);
    };
  }, []);

  const getNodeRadius = (size: NodeSize): number => {
    switch (size) {
      case 'small': return 6;
      case 'medium': return 9;
      case 'large': return 12;
    }
  };

  const getDepthScale = (layer: DepthLayer): number => {
    switch (layer) {
      case 'back': return 0.7;
      case 'mid': return 0.85;
      case 'front': return 1.0;
    }
  };

  const getDepthBlur = (layer: DepthLayer): number => {
    switch (layer) {
      case 'back': return 1.5;
      case 'mid': return 0.5;
      case 'front': return 0;
    }
  };

  const initializeNodes = useCallback((width: number, height: number) => {
    const nodes: PatentNode[] = [];
    const edges: Edge[] = [];
    const isMobile = width < 768;

    // Single cluster centered in the canvas (like a brain)
    const centerX = width / 2;
    const centerY = height / 2;
    const nodeCount = isMobile ? 12 : 20; // Further optimized for performance

    let nodeId = 0;

    // Create nodes in a single cluster
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 60 + Math.random() * 120; // Tighter cluster
      const layer: DepthLayer = ['back', 'mid', 'front'][Math.floor(Math.random() * 3)] as DepthLayer;
      const size: NodeSize = Math.random() < 0.15 ? 'large' : Math.random() < 0.4 ? 'medium' : 'small';

      nodes.push({
        id: nodeId++,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        z: layer === 'front' ? 1 : layer === 'mid' ? 0 : -1,
        size,
        layer,
        cluster: 0, // All nodes in same cluster
        title: PATENT_TITLES[Math.floor(Math.random() * PATENT_TITLES.length)],
        neighbors: [],
      });
    }

    // Create edges within the cluster
    nodes.forEach((node, i) => {
      const connectionCount = 1 + Math.floor(Math.random() * 2); // 1-2 connections per node for better performance
      
      for (let j = 0; j < Math.min(connectionCount, nodes.length - 1); j++) {
        const otherNodes = nodes.filter(n => n.id !== node.id);
        const neighbor = otherNodes[Math.floor(Math.random() * otherNodes.length)];
        if (!edges.some(e => (e.from === node.id && e.to === neighbor.id) || (e.from === neighbor.id && e.to === node.id))) {
          edges.push({ from: node.id, to: neighbor.id });
          node.neighbors.push(neighbor.id);
          neighbor.neighbors.push(node.id);
        }
      }
    });

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  const drawConnectorLine = (
    ctx: CanvasRenderingContext2D,
    nodeX: number,
    nodeY: number,
    progress: number,
    width: number,
    height: number
  ) => {
    ctx.save();
    
        // Position card further down to avoid navbar
        const cardTopY = 128; // Positioned to connect with line (top-32 = 128px)
    const cardHeight = 60;
    const cardBottomY = cardTopY + cardHeight;
    
    // Always draw line when there's a spotlight or hover, regardless of node position
    // Use full opacity for better visibility
    const lineOpacity = Math.max(0.7, progress); // Minimum 70% opacity, full when progress is 1
    ctx.strokeStyle = `rgba(255, 107, 107, ${lineOpacity})`;
    ctx.lineWidth = 1.5; // Thinner line as requested
    ctx.setLineDash([6, 4]); // More prominent dashed line
    ctx.beginPath();
    ctx.moveTo(nodeX, nodeY);
    ctx.lineTo(nodeX, cardTopY); // Connect directly to the top of the card
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.restore();
  };

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    ctx.clearRect(0, 0, width, height);

    // Camera orbit (unless reduced motion or mobile)
    const isMobile = width < 768;
    if (!prefersReducedMotion && !isMobile) {
      orbitAngle.current = (timestamp / 30000) * (Math.PI / 30); // Slower orbit for better performance
    }

    const cos = Math.cos(orbitAngle.current);
    const sin = Math.sin(orbitAngle.current);

    // Shimmer effect
    const shimmer = !prefersReducedMotion ? Math.sin(timestamp / 6000) * 0.1 : 0;

    // Draw edges first
    edgesRef.current.forEach(edge => {
      const fromNode = nodesRef.current[edge.from];
      const toNode = nodesRef.current[edge.to];
      if (!fromNode || !toNode) return;

      // Apply parallax for depth
      const fromParallax = getDepthScale(fromNode.layer);
      const toParallax = getDepthScale(toNode.layer);
      
      const fromX = fromNode.x + fromNode.z * sin * 5 * fromParallax;
      const fromY = fromNode.y + fromNode.z * cos * 3 * fromParallax;
      const toX = toNode.x + toNode.z * sin * 5 * toParallax;
      const toY = toNode.y + toNode.z * cos * 3 * toParallax;

      const isConnectedToHovered = hoveredNode !== null && 
        (fromNode.id === hoveredNode || toNode.id === hoveredNode ||
         fromNode.neighbors.includes(hoveredNode) || toNode.neighbors.includes(hoveredNode));

      const isConnectedToSpotlight = spotlightState.nodeId !== null &&
        (fromNode.id === spotlightState.nodeId || toNode.id === spotlightState.nodeId ||
         fromNode.neighbors.includes(spotlightState.nodeId) || toNode.neighbors.includes(spotlightState.nodeId));

      let opacity = 0.2;
      if (hoveredNode !== null) {
        opacity = isConnectedToHovered ? 0.6 : 0.1;
      } else if (isConnectedToSpotlight) {
        opacity = 0.4;
      }

      opacity += shimmer;

      ctx.strokeStyle = isDark 
        ? `rgba(250, 245, 240, ${opacity})` 
        : `rgba(15, 23, 42, ${opacity})`;
      
      ctx.lineWidth = 1;
      ctx.filter = `blur(${Math.max(getDepthBlur(fromNode.layer), getDepthBlur(toNode.layer))}px)`;
      
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
      ctx.filter = 'none';
    });

    // Sort nodes by depth (back to front)
    const sortedNodes = [...nodesRef.current].sort((a, b) => a.z - b.z);

    // Draw nodes
    sortedNodes.forEach(node => {
      const parallax = getDepthScale(node.layer);
      const x = node.x + node.z * sin * 5 * parallax;
      const y = node.y + node.z * cos * 3 * parallax;

      const isHovered = hoveredNode === node.id;
      const isSpotlight = spotlightState.nodeId === node.id;
      const isNeighbor = hoveredNode !== null && node.neighbors.includes(hoveredNode);
      
      let scale = 1;
      if (isHovered) scale = 1.4;
      else if (isSpotlight) scale = 1.3;
      else if (isNeighbor) scale = 1.05;

      const radius = getNodeRadius(node.size) * scale * parallax;
      
      ctx.save();
      ctx.filter = `blur(${getDepthBlur(node.layer)}px)`;
      
      // Only apply enhanced multi-layer glow to selected/hovered nodes
      if (isHovered || isSpotlight) {
        const coralColor = 'rgb(255, 107, 107)';
        // Use animated glow progress for smoother transitions
        const animatedGlow = glowProgress;
        
        // Outer glow (largest, most diffuse)
        ctx.shadowColor = coralColor;
        ctx.shadowBlur = radius * 4 * animatedGlow;
        ctx.fillStyle = `rgba(255, 107, 107, ${0.1 * animatedGlow})`;
        ctx.beginPath();
        ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Middle glow
        ctx.shadowBlur = radius * 2.5 * animatedGlow;
        ctx.fillStyle = `rgba(255, 107, 107, ${0.3 * animatedGlow})`;
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner glow
        ctx.shadowBlur = radius * 1.5 * animatedGlow;
        ctx.fillStyle = `rgba(255, 107, 107, ${0.6 * animatedGlow})`;
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core sphere with enhanced glow
        ctx.shadowColor = coralColor;
        ctx.shadowBlur = radius * 2 * animatedGlow;
        
        // Create radial gradient for the core
        const gradient = ctx.createRadialGradient(
          x - radius * 0.3, 
          y - radius * 0.3, 
          0, 
          x, 
          y, 
          radius
        );
        gradient.addColorStop(0, 'rgba(255, 150, 150, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 107, 107, 1)');
        gradient.addColorStop(1, 'rgba(220, 80, 80, 1)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Regular nodes - simple solid circle with minimal glow
        ctx.shadowColor = 'rgb(255, 107, 107)';
        ctx.shadowBlur = 4;
        ctx.fillStyle = 'rgb(255, 107, 107)';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();

      // Draw connector line for spotlight and hover - always visible
      if ((isSpotlight && spotlightState.progress > 0) || isHovered) {
        const lineProgress = isHovered ? 1 : spotlightState.progress;
        drawConnectorLine(ctx, x, y, lineProgress, width, height);
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isDark, hoveredNode, spotlightState, prefersReducedMotion, glowProgress]);

  // Animate glow intensity when spotlight changes
  useEffect(() => {
    if (spotlightState.nodeId !== null || hoveredNode !== null) {
      // Animate glow up
      let startTime: number | null = null;
      let animFrame: number;
      
      const animateGlow = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / 400, 1); // 400ms glow up animation
        
        setGlowProgress(progress);
        
        if (progress < 1) {
          animFrame = requestAnimationFrame(animateGlow);
        }
      };
      
      animFrame = requestAnimationFrame(animateGlow);
      
      return () => {
        if (animFrame) cancelAnimationFrame(animFrame);
      };
    } else {
      setGlowProgress(0);
    }
  }, [spotlightState.nodeId, hoveredNode]);

  // Auto spotlight cycle
  useEffect(() => {
    console.log('=== SPOTLIGHT CYCLE DEBUG ===');
    console.log('Spotlight useEffect triggered:', {
      prefersReducedMotion,
      canStartSpotlight,
      hoveredNode,
      nodesCount: nodesRef.current.length
    });
    
    if (prefersReducedMotion || !canStartSpotlight) {
      console.log('Spotlight cycle blocked:', { prefersReducedMotion, canStartSpotlight });
      return;
    }

    let timeoutId: number;
    let animationId: number;

    const runSpotlight = () => {
      console.log('=== RUNSPOTLIGHT CALLED ===');
      console.log('Current state:', {
        hoveredNode,
        nodesCount: nodesRef.current.length,
        displayTitle,
        spotlightState
      });
      
      // Pause if hovering
      if (hoveredNode !== null) {
        console.log('Paused due to hover, retrying in 100ms');
        timeoutId = window.setTimeout(runSpotlight, 100);
        return;
      }

      // Use all nodes for spotlight selection
      const visibleNodes = nodesRef.current;
      console.log('Available nodes:', visibleNodes.length);
      
      if (visibleNodes.length === 0) {
        console.log('No nodes available, retrying in 100ms');
        timeoutId = window.setTimeout(runSpotlight, 100);
        return;
      }

      const node = visibleNodes[Math.floor(Math.random() * visibleNodes.length)];
      console.log('=== SELECTED NODE FOR SPOTLIGHT ===');
      console.log('Selected node:', {
        id: node.id,
        title: node.title,
        titleLength: node.title?.length || 0,
        hasTitle: !!node.title,
        x: node.x,
        y: node.y
      });
      
      console.log('Setting spotlight state and display title...');
      setSpotlightState({ nodeId: node.id, progress: 0 });
      setDisplayTitle(node.title);

      // Animate in
      let startTime: number | null = null;
      const animateIn = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / 300, 1);
        
        console.log('Animate in progress:', progress, 'for node:', node.id);
        setSpotlightState({ nodeId: node.id, progress });
        
        if (progress < 1) {
          animationId = requestAnimationFrame(animateIn);
        } else {
          console.log('Animate in complete, holding for 2s...');
          // Hold for 2s then animate out
          timeoutId = window.setTimeout(() => {
            console.log('Starting animate out...');
            let startTimeOut: number | null = null;
            const animateOut = (timestamp: number) => {
              if (!startTimeOut) startTimeOut = timestamp;
              const elapsed = timestamp - startTimeOut;
              const progress = Math.max(1 - elapsed / 200, 0);
              
              console.log('Animate out progress:', progress, 'for node:', node.id);
              setSpotlightState({ nodeId: node.id, progress });
              
              if (progress > 0) {
                animationId = requestAnimationFrame(animateOut);
              } else {
                console.log('Animate out complete, clearing title and waiting...');
                setSpotlightState({ nodeId: null, progress: 0 });
                setDisplayTitle('');
                // Wait before next spotlight
                timeoutId = window.setTimeout(runSpotlight, 1000);
              }
            };
            animationId = requestAnimationFrame(animateOut);
          }, 2000);
        }
      };
      console.log('Starting animate in for node:', node.id);
      animationId = requestAnimationFrame(animateIn);
    };

    // Run immediately when canStartSpotlight becomes true
    runSpotlight();
    
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion, hoveredNode, canStartSpotlight]);

  // Update display title for hover
  useEffect(() => {
    if (hoveredNode !== null) {
      const node = nodesRef.current.find(n => n.id === hoveredNode);
      if (node) {
        setDisplayTitle(node.title);
      }
    } else if (spotlightState.nodeId === null) {
      setDisplayTitle('');
    }
  }, [hoveredNode, spotlightState.nodeId]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePos.current = { x, y };

    clearTimeout(hoverTimeout.current);

    // Find node under cursor
    let foundNode: number | null = null;
    for (const node of nodesRef.current) {
      const parallax = getDepthScale(node.layer);
      const nx = node.x + node.z * Math.sin(orbitAngle.current) * 5 * parallax;
      const ny = node.y + node.z * Math.cos(orbitAngle.current) * 3 * parallax;
      const radius = getNodeRadius(node.size) * parallax + 5; // Add some padding

      const distance = Math.sqrt((x - nx) ** 2 + (y - ny) ** 2);
      if (distance <= radius) {
        foundNode = node.id;
        break;
      }
    }

    if (foundNode !== null) {
      canvas.style.cursor = 'pointer';
      hoverTimeout.current = window.setTimeout(() => {
        setHoveredNode(foundNode);
      }, 120);
    } else {
      canvas.style.cursor = 'default';
      setHoveredNode(null);
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setHoveredNode(null);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'default';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      // Use device pixel ratio but cap at 2 for performance
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      initializeNodes(canvas.offsetWidth, canvas.offsetHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(hoverTimeout.current);
      clearTimeout(spotlightTimeout.current);
    };
  }, [animate, initializeNodes]);

  // COMPREHENSIVE DEBUG LOGGING FOR PATENT TITLES
  console.log('=== PATENT TITLES DEBUG ===');
  console.log('Component state:', {
    canStartSpotlight,
    spotlightState,
    displayTitle,
    isGraphVisible,
    hoveredNode,
    nodesCount: nodesRef.current.length,
    edgesCount: edgesRef.current.length
  });
  
  // Debug nodes array
  if (nodesRef.current.length > 0) {
    console.log('First 3 nodes with titles:', nodesRef.current.slice(0, 3).map(n => ({
      id: n.id,
      title: n.title,
      x: n.x,
      y: n.y,
      hasTitle: !!n.title,
      titleLength: n.title?.length || 0
    })));
  }
  
  // Debug visibility calculation
  const isVisible = (hoveredNode !== null || spotlightState.progress > 0) && displayTitle && displayTitle.length > 0;
  const opacity = hoveredNode !== null ? 1 : spotlightState.progress;
  
  console.log('Visibility calculation:', {
    isVisible,
    opacity,
    hoveredNode,
    spotlightProgress: spotlightState.progress,
    displayTitleLength: displayTitle?.length || 0,
    displayTitleExists: !!displayTitle,
    displayTitleValue: displayTitle
  });
  
  // Debug useEffect triggers
  useEffect(() => {
    console.log('=== USEEFFECT DEBUG ===');
    console.log('Spotlight cycle useEffect triggered:', {
      canStartSpotlight,
      hoveredNode,
      spotlightState,
      nodesCount: nodesRef.current.length
    });
  }, [canStartSpotlight, hoveredNode, spotlightState]);
  
  // Debug display title changes
  useEffect(() => {
    console.log('Display title changed:', {
      newTitle: displayTitle,
      titleLength: displayTitle?.length || 0,
      hasTitle: !!displayTitle
    });
  }, [displayTitle]);
  
  // Debug spotlight state changes
  useEffect(() => {
    console.log('Spotlight state changed:', {
      nodeId: spotlightState.nodeId,
      progress: spotlightState.progress,
      hasNodeId: spotlightState.nodeId !== null
    });
  }, [spotlightState]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full transition-opacity duration-500"
        style={{ opacity: isGraphVisible ? 1 : 0 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {/* Patent title display - positioned to connect with line */}
      {displayTitle && (
        <div 
          className="absolute top-32 left-4 right-4 flex items-center justify-center pointer-events-none transition-opacity duration-300 z-10 px-4"
          style={{ 
            opacity: isVisible ? opacity : 0,
            backgroundColor: 'rgba(255, 0, 0, 0.2)', // Red background for debugging
            border: '2px solid red' // Red border for debugging
          }}
        >
          <div className="px-4 py-3 rounded-lg shadow-lg backdrop-blur-xl bg-white/90 border border-white/20 text-[rgb(15,23,42)] max-w-lg">
            <p className="text-sm leading-relaxed font-medium text-red-600">{displayTitle}</p>
            {hoveredNode !== null && (
              <p className="text-xs text-[rgb(255,107,107)] mt-1">View details</p>
            )}
          </div>
        </div>
      )}
      
      {/* Debug info display */}
      <div className="absolute top-4 left-4 bg-black/90 text-white p-3 rounded text-xs z-50 max-w-sm">
        <div className="font-bold mb-2">PATENT TITLES DEBUG</div>
        <div>Display Title: {displayTitle || 'NONE'}</div>
        <div>Is Visible: {isVisible ? 'YES' : 'NO'}</div>
        <div>Opacity: {opacity}</div>
        <div>Spotlight Progress: {spotlightState.progress}</div>
        <div>Hovered Node: {hoveredNode}</div>
        <div>Nodes Count: {nodesRef.current.length}</div>
        <div>Can Start Spotlight: {canStartSpotlight ? 'YES' : 'NO'}</div>
        <div>Spotlight Node ID: {spotlightState.nodeId}</div>
        <div>Display Title Length: {displayTitle?.length || 0}</div>
      </div>
    </div>
  );
}