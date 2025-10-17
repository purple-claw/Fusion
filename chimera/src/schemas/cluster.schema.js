/**
 * Cluster Schema Definitions
 * Defining the structure of content clusters produced by Phrolova....
 */

const ClusterType = {
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  CODE_BLOCK: 'code_block',
  CODE_DEMO: 'code_demo',
  LIST: 'list',
  BLOCKQUOTE: 'blockquote',
  TABLE: 'table',
  IMAGE: 'image',
  LINK: 'link',
  HORIZONTAL_RULE: 'hr',
  HTML_BLOCK: 'html_block',
  CONTAINER: 'container',
  WARNING: 'warning',
  NOTE: 'note',
  TIP: 'tip',
  SECTION: 'section'
};

const LanguageType = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript',
  PYTHON: 'python',
  HTML: 'html',
  CSS: 'css',
  JSON: 'json',
  MARKDOWN: 'markdown',
  BASH: 'bash',
  SQL: 'sql',
  YAML: 'yaml',
  XML: 'xml',
  JAVA: 'java',
  CPP: 'cpp',
  GO: 'go',
  RUST: 'rust',
  UNKNOWN: 'unknown'
};

class ContentCluster {
  constructor(type, data = {}) {
    this.id = this.generateId();
    this.type = type;
    this.level = data.level || null;
    this.content = data.content || '';
    this.raw = data.raw || '';
    this.children = data.children || [];
    this.parent = data.parent || null;
    this.metadata = {
      language: data.language || null,
      lineStart: data.lineStart || null,
      lineEnd: data.lineEnd || null,
      attributes: data.attributes || {},
      tags: data.tags || [],
      isInteractive: data.isInteractive || false,
      position: data.position || null
    };
    this.processed = {
      html: null,
      css: null,
      js: null,
      demo: null
    };
    this.timestamp = Date.now();
  }

  generateId() {
    return `cluster_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  addChild(cluster) {
    cluster.parent = this.id;
    this.children.push(cluster);
  }

  setProcessedContent(type, content) {
    if (this.processed.hasOwnProperty(type)) {
      this.processed[type] = content;
    }
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      level: this.level,
      content: this.content,
      raw: this.raw,
      children: this.children.map(child => 
        child instanceof ContentCluster ? child.toJSON() : child
      ),
      parent: this.parent,
      metadata: this.metadata,
      processed: this.processed,
      timestamp: this.timestamp
    };
  }
}


class DocumentManifest {
  constructor(sourceFile) {
    this.id = `doc_${Date.now()}`;
    this.sourceFile = sourceFile;
    this.clusters = [];
    this.hierarchy = null;
    this.metadata = {
      totalLines: 0,
      totalClusters: 0,
      parseTime: null,
      version: '1.0.0',
      checksum: null,
      title: null,
      description: null,
      tags: [],
      toc: []
    };
    this.errors = [];
    this.warnings = [];
    this.stats = {
      clusterTypes: {},
      languages: {},
      processingTime: {}
    };
  }

  addCluster(cluster) {
    this.clusters.push(cluster);
    this.updateStats(cluster);
  }

  updateStats(cluster) {
    this.stats.clusterTypes[cluster.type] = 
      (this.stats.clusterTypes[cluster.type] || 0) + 1;
    
    if (cluster.metadata.language) {
      this.stats.languages[cluster.metadata.language] = 
        (this.stats.languages[cluster.metadata.language] || 0) + 1;
    }
  }

  buildHierarchy() {
    const root = new ContentCluster(ClusterType.SECTION, {
      content: 'Document Root'
    });
    
    let currentSection = root;
    let sectionStack = [root];
    
    this.clusters.forEach(cluster => {
      if (cluster.type === ClusterType.HEADING) {
        // Create section hierarchy based on heading levels
        while (sectionStack.length > cluster.level) {
          sectionStack.pop();
        }
        
        const section = new ContentCluster(ClusterType.SECTION, {
          level: cluster.level,
          content: cluster.content
        });
        
        section.addChild(cluster);
        sectionStack[sectionStack.length - 1].addChild(section);
        sectionStack.push(section);
        currentSection = section;
      } else {
        currentSection.addChild(cluster);
      }
    });
    
    this.hierarchy = root;
    return root;
  }

  generateTOC() {
    const toc = [];
    
    const traverse = (cluster, depth = 0) => {
      if (cluster.type === ClusterType.HEADING) {
        toc.push({
          id: cluster.id,
          text: cluster.content,
          level: cluster.level || depth,
          anchor: `#${cluster.id}`
        });
      }
      
      if (cluster.children) {
        cluster.children.forEach(child => traverse(child, depth + 1));
      }
    };
    
    if (this.hierarchy) {
      traverse(this.hierarchy);
    } else {
      this.clusters.forEach(cluster => traverse(cluster));
    }
    
    this.metadata.toc = toc;
    return toc;
  }

  toJSON() {
    return {
      id: this.id,
      sourceFile: this.sourceFile,
      clusters: this.clusters.map(c => c.toJSON()),
      hierarchy: this.hierarchy ? this.hierarchy.toJSON() : null,
      metadata: this.metadata,
      errors: this.errors,
      warnings: this.warnings,
      stats: this.stats
    };
  }
}

module.exports = {
  ClusterType,
  LanguageType,
  ContentCluster,
  DocumentManifest
};
