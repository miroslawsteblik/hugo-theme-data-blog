document.addEventListener('DOMContentLoaded', function() {
  // Only run if visualization container exists
  if (!document.getElementById('pipeline-visualization')) return;
  
  // Data pipeline structure
  const pipelineData = {
    name: "Data Pipeline",
    children: [
      {
        name: "Extract",
        stage: "extract",
        children: [
          { name: "API Data", stage: "extract" },
          { name: "Database", stage: "extract" },
          { name: "Files", stage: "extract" }
        ]
      },
      {
        name: "Transform",
        stage: "transform",
        children: [
          { name: "Clean", stage: "transform" },
          { name: "Normalize", stage: "transform" },
          { name: "Enrich", stage: "transform" }
        ]
      },
      {
        name: "Load",
        stage: "load",
        children: [
          { name: "Data Warehouse", stage: "load" },
          { name: "Analytics DB", stage: "load" }
        ]
      }
    ]
  };

  // Setup dimensions and margins
  const width = document.getElementById('pipeline-visualization').clientWidth;
  const height = 250;
  const margin = { top: 10, right: 10, bottom: 10, left: 40 };
  
  // Create SVG container
  const svg = d3.select("#pipeline-visualization")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // Create the tree layout
  const tree = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
  
  // Convert data to hierarchy
  const root = d3.hierarchy(pipelineData);
  
  // Map nodes to positions
  const nodes = tree(root);
  
  // Add links between nodes
  svg.selectAll(".link")
    .data(nodes.links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x))
    .attr("data-stage", d => d.target.data.stage);
  
  // Add node groups
  const node = svg.selectAll(".node")
    .data(nodes.descendants())
    .enter().append("g")
    .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
    .attr("transform", d => `translate(${d.y},${d.x})`)
    .attr("data-stage", d => d.data.stage);
  
  // Add circles to nodes
  node.append("circle")
    .attr("r", 6);
  
  // Add labels to nodes
  node.append("text")
    .attr("dy", ".35em")
    .attr("x", d => d.children ? -13 : 13)
    .style("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);
  
  // Handle stage filtering
  document.getElementById('pipeline-stage').addEventListener('change', function() {
    const stage = this.value;
    
    if (stage === 'all') {
      svg.selectAll(".node, .link").classed("highlighted", false);
      return;
    }
    
    svg.selectAll(".node").classed("highlighted", false);
    svg.selectAll(`.node[data-stage="${stage}"]`).classed("highlighted", true);
    
    svg.selectAll(".link").classed("highlighted", false);
    svg.selectAll(`.link[data-stage="${stage}"]`).classed("highlighted", true);
  });
  
  // Reset button
  document.getElementById('reset-viz').addEventListener('click', function() {
    document.getElementById('pipeline-stage').value = 'all';
    svg.selectAll(".node, .link").classed("highlighted", false);
  });
  
  // Make visualization responsive
  window.addEventListener('resize', function() {
    const width = document.getElementById('pipeline-visualization').clientWidth;
    d3.select("#pipeline-visualization svg")
      .attr("width", width);
      
    const tree = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    const nodes = tree(root);
    
    svg.selectAll(".link")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));
    
    svg.selectAll(".node")
      .attr("transform", d => `translate(${d.y},${d.x})`);
  });
});