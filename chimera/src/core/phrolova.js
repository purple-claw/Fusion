/**
 * PHROLOVA - The Paranoid Parsing Engine.... Queen of Havoc Legends...
 * 
 * Named after that one friend who reads EVERYTHING twice
 * and still asks "but what did you REALLY mean?"
 * 
 * This is where markdown goes to become something beautiful...
 * or die trying (usually the latter)
 */

const fs = require('fs').promises;
const { createReadStream } = require('fs');
const { pipeline } = require('stream/promises');
const { marked } = require('marked');
const OpenAI = require('openai');
const chalk = require('chalk');
const { v4: generateMagicalId } = require('uuid');
const { ContentCluster, DocumentManifest, ClusterType } = require('../schemas/cluster.schema');
const ChimeraConfig = require('../../config/chimera.config');

// Because console.log is too mainstream
const screamIntoTheVoid = (message, level = 'info') => {
  const prefixOfDoom = {
    info: chalk.blue('[PHROLOVA]'),
    warn: chalk.yellow('[PHROLOVA-WORRIED]'),
    error: chalk.red('[PHROLOVA-DYING]'),
    success: chalk.green('[PHROLOVA-HAPPY]'),
    thinking: chalk.magenta('[PHROLOVA-THINKING]'),
    coffee: chalk.rgb(139, 69, 19)('[PHROLOVA-NEEDS-COFFEE]')
  };
  
  console.log(`${prefixOfDoom[level] || prefixOfDoom.info} ${message}`);
};

class PhrolovaTheBrilliant {
  constructor() {
    // My precious properties
    this.brainCells = null; // The LLM connection
    this.currentVictim = null; // The document being parsed
    this.mentalBreakdownCounter = 0; // How many times we've failed
    this.caffeineLevel = 100; // Starts optimistic
    this.existentialDread = false; // Not yet...
    
    // The sacred configuration
    this.innerSecrets = ChimeraConfig.phrolovaSecrets;
    this.cosmicLimits = ChimeraConfig.cosmicConstants;
    
    // Statistics for bragging rights, because we are all egoists hahahaha....
    this.achievementsUnlocked = {
      linesConquered: 0,
      clustersForged: 0,
      demonsSlain: 0,
      coffeeConsumed: 0,
      llmTokensBurned: 0,
      timeWasted: 0 // in milliseconds, like my patience
    };
    
    // Initialize the neural pathways
    this.awakening();
  }
  
   // Awakens Phrolova from its slumber
   // Also known as "initialization" in boring developer speak
  async awakening() {
    try {
      screamIntoTheVoid('Awakening from digital slumber...', 'thinking');
      
      // Summon the LLM oracle (if you have the sacred key)
      if (this.innerSecrets.apiKeyOfPower !== 'you-forgot-the-key-genius') {
        this.brainCells = new OpenAI({
          apiKey: this.innerSecrets.apiKeyOfPower
        });
        screamIntoTheVoid('Neural pathways connected! The LLM speaks to me!', 'success');
      } else {
        screamIntoTheVoid('No API key? Guess we\'re going old school with regex...', 'warn');
        this.existentialDread = true;
      }
      
      // Check our caffeine reserves
      this.checkCaffeineLevel();
      
    } catch (ohNo) {
      screamIntoTheVoid(`Awakening failed: ${ohNo.message}. Going back to sleep...`, 'error');
      this.existentialDread = true;
    }
  }
  
  /**
   * The main parsing orchestration - where magic meets madness
   * @param {string} victimPath - Path to the innocent markdown file
   * @returns {DocumentManifest} - A beautiful data structure, or null if we gave up
   */
  async digestDocument(victimPath) {
    const startOfSuffering = Date.now();
    screamIntoTheVoid(`Beginning digestion of: ${victimPath}`, 'info');
    
    try {
      this.currentVictim = new DocumentManifest(victimPath);
      const rawMadness = await this.slurpFile(victimPath);
      
      if (!rawMadness) {
        throw new Error('File is empty or I can\'t read. Probably both.');
      }
      
      // Check if you should panic yet
      const lineCount = rawMadness.split('\n').length;
      this.achievementsUnlocked.linesConquered = lineCount;
      
      if (lineCount > this.cosmicLimits.EXISTENTIAL_CRISIS_LINE_COUNT) {
        screamIntoTheVoid(`${lineCount} lines?! That's... that's a lot. Taking a deep breath...`, 'coffee');
        this.caffeineLevel -= 20;
        this.existentialDread = true;
      }
      
      // Tokenize with marked.js first (the sane approach, because we are all sane hahahaha....)
      const roughChunks = await this.roughChop(rawMadness);
      
      // Now the fun part - intelligent clustering with LLM, because we are all geniuses hahahaha....
      const enlightenedClusters = await this.achieveEnlightenment(roughChunks, rawMadness);
      
      // Build the hierarchy (make it pretty, because we are all narcissists hahahaha....)
      this.currentVictim.clusters = enlightenedClusters;
      this.currentVictim.buildHierarchy();
      this.currentVictim.generateTOC();
      
      // Update statistics for bragging
      this.currentVictim.metadata.totalLines = lineCount;
      this.currentVictim.metadata.totalClusters = enlightenedClusters.length;
      this.currentVictim.metadata.parseTime = Date.now() - startOfSuffering;
      
      // Victory lap
      const timeWasted = Date.now() - startOfSuffering;
      this.achievementsUnlocked.timeWasted = timeWasted;
      
      screamIntoTheVoid(
        `Document digested! ${enlightenedClusters.length} clusters created in ${timeWasted}ms. ` +
        `Only cried ${this.mentalBreakdownCounter} times!`,
        'success'
      );
      
      return this.currentVictim;
      
    } catch (disaster) {
      this.mentalBreakdownCounter++;
      screamIntoTheVoid(`Parsing failed spectacularly: ${disaster.message}`, 'error');
      
      if (this.mentalBreakdownCounter >= this.cosmicLimits.MAX_RETRY_BEFORE_BLAME_USER) {
        screamIntoTheVoid('I give up. It\'s definitely the user\'s markdown.', 'error');
      }
      
      return null;
    }
  }
  
  /**
   * Reads a file like a normal person (but with more drama)
   */
  async slurpFile(pathToKnowledge) {
    try {
      const contents = await fs.readFile(pathToKnowledge, 'utf-8');
      return contents;
    } catch (oops) {
      screamIntoTheVoid(`Cannot read file. Did you forget it exists? ${oops.message}`, 'error');
      throw oops;
    }
  }
  
  /**
   * First pass parsing with marked.js
   * Like a rough draft, but for computers
   */
  async roughChop(textSoup) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      let lineTracker = 1;
      
      // Custom renderer to capture everything
      const rendererOfTruth = {
        heading(text, level) {
          chunks.push({
            type: 'heading',
            level,
            text,
            line: lineTracker
          });
          lineTracker++;
          return '';
        },
        
        paragraph(text) {
          chunks.push({
            type: 'paragraph',
            text,
            line: lineTracker
          });
          lineTracker++;
          return '';
        },
        
        code(code, language) {
          chunks.push({
            type: 'code',
            language: language || 'unknown',
            code,
            line: lineTracker,
            // Check if this looks like it wants to be interactive
            wantsToParty: this.looksInteractive(code, language)
          });
          lineTracker += code.split('\n').length;
          return '';
        },
        
        list(body, ordered) {
          chunks.push({
            type: 'list',
            ordered,
            body,
            line: lineTracker
          });
          return '';
        },
        
        blockquote(text) {
          chunks.push({
            type: 'blockquote',
            text,
            line: lineTracker,
            // Check if it's a special note/warning/tip
            personality: this.detectBlockquotePersonality(text)
          });
          return '';
        }
      };
      
      marked.use({ renderer: rendererOfTruth });
      
      try {
        marked.parse(textSoup);
        resolve(chunks);
      } catch (markdownDisaster) {
        reject(markdownDisaster);
      }
    });
  }
  
  /**
   * The intelligent clustering phase - where we consult the oracle (LLM)
   */
  async achieveEnlightenment(roughChunks, originalText) {
    const enlightenedClusters = [];
    
    // Process in batches because LLMs have attention span issues
    const chunkBatches = this.sliceIntoManageableBites(roughChunks, 20);
    
    for (const batch of chunkBatches) {
      if (this.caffeineLevel < 30) {
        screamIntoTheVoid('Caffeine dangerously low. Quality may suffer.', 'coffee');
        await this.coffeeBreak();
      }
      
      // Ask the LLM for wisdom (or hallucinations, we'll see)
      const wisdom = await this.consultTheOracle(batch, originalText);
      
      // Convert wisdom into clusters
      const batchClusters = this.manifestWisdomIntoClusters(wisdom, batch);
      enlightenedClusters.push(...batchClusters);
      
      // Update progress (for morale)
      this.achievementsUnlocked.clustersForged = enlightenedClusters.length;
    }
    
    return enlightenedClusters;
  }
  
  /**
   * Consults the LLM oracle for deep wisdom about our markdown
   * Warning: May contain traces of hallucination
   */
  async consultTheOracle(chunks, context) {
    if (!this.brainCells || this.existentialDread) {
      // No LLM? Time for caffeine-powered regex magic
      return this.hallucinateWithoutLLM(chunks);
    }
    
    try {
      const prompt = this.craftMysticalPrompt(chunks, context);
      
      screamIntoTheVoid('Consulting the oracle...', 'thinking');
      
      const prophecy = await this.brainCells.chat.completions.create({
        model: this.innerSecrets.llmModel,
        messages: [
          {
            role: 'system',
            content: 'You are a markdown parsing expert. Analyze structure and identify semantic clusters. Be accurate, no hallucinations. Return valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: this.innerSecrets.creativityTemp,
        max_tokens: this.innerSecrets.maxTokensBeforeExistentialDread
      });
      
      const wisdom = JSON.parse(prophecy.choices[0].message.content);
      this.achievementsUnlocked.llmTokensBurned += prophecy.usage?.total_tokens || 0;
      
      return wisdom;
      
    } catch (oracleConfusion) {
      screamIntoTheVoid(`Oracle confused: ${oracleConfusion.message}. Falling back to coffee-powered parsing.`, 'warn');
      return this.hallucinateWithoutLLM(chunks);
    }
  }
  
  /**
   * When the LLM fails us, we parse like it's 1999
   */
  hallucinateWithoutLLM(chunks) {
    screamIntoTheVoid('Parsing without LLM. Expect greatness (or disasters).', 'warn');
    
    return chunks.map((chunk, index) => {
      const clusterId = `cluster_${generateMagicalId()}`;
      
      return {
        id: clusterId,
        type: this.guessClusterType(chunk.type),
        content: chunk.text || chunk.code || chunk.body || '',
        metadata: {
          language: chunk.language,
          isInteractive: chunk.wantsToParty || false,
          personality: chunk.personality,
          line: chunk.line,
          confidence: 'low', // we're being honest here
          parsedBy: 'coffee-and-regex'
        }
      };
    });
  }
  
  /**
   * Transforms oracle wisdom into actual ContentCluster objects
   */
  manifestWisdomIntoClusters(wisdom, originalChunks) {
    const clusters = [];
    
    // Handle both LLM and fallback responses
    const wisdomArray = Array.isArray(wisdom) ? wisdom : [wisdom];
    
    wisdomArray.forEach((prophecy, index) => {
      const originalChunk = originalChunks[index] || {};
      
      const cluster = new ContentCluster(
        prophecy.type || ClusterType.PARAGRAPH,
        {
          content: prophecy.content || originalChunk.text || '',
          raw: originalChunk.raw || prophecy.content || '',
          level: prophecy.level || originalChunk.level,
          language: prophecy.metadata?.language || originalChunk.language,
          lineStart: prophecy.metadata?.line || originalChunk.line,
          isInteractive: prophecy.metadata?.isInteractive || false,
          attributes: prophecy.metadata || {},
          tags: prophecy.tags || []
        }
      );
      
      clusters.push(cluster);
    });
    
    return clusters;
  }
  
  /**
   * Detects if a code block wants to party (be interactive)
   */
  looksInteractive(code, language) {
    // JavaScript that looks runnable
    if (language === 'javascript' || language === 'js') {
      return code.includes('console.log') || 
             code.includes('alert') || 
             code.includes('document.');
    }
    
    // HTML with potential interactivity
    if (language === 'html') {
      return code.includes('<script>') || 
             code.includes('onclick') || 
             code.includes('<button');
    }
    
    // Python that might want a REPL
    if (language === 'python') {
      return code.includes('print(') || 
             code.includes('input(') ||
             code.length < 500; // Short enough to demo
    }
    
    return false;
  }
  
  /**
   * Detects special blockquote personalities (warnings, notes, tips)
   */
  detectBlockquotePersonality(text) {
    const textLower = text.toLowerCase();
    
    if (textLower.startsWith('warning:') || textLower.startsWith('⚠')) {
      return 'warning';
    }
    if (textLower.startsWith('note:') || textLower.startsWith('📝')) {
      return 'note';
    }
    if (textLower.startsWith('tip:') || textLower.startsWith('💡')) {
      return 'tip';
    }
    if (textLower.startsWith('danger:') || textLower.startsWith('☠')) {
      return 'danger';
    }
    
    return 'philosophical'; // Just a regular deep thought
  }
  
  /**
   * Slices chunks into bite-sized pieces for the LLM's tiny attention span
   */
  sliceIntoManageableBites(chunks, biteSize = 20) {
    const batches = [];
    for (let i = 0; i < chunks.length; i += biteSize) {
      batches.push(chunks.slice(i, i + biteSize));
    }
    return batches;
  }
  
  /**
   * Crafted a mystical prompt for the LLM oracle
   */
  craftMysticalPrompt(chunks, context) {
    return `Analyze these markdown chunks and identify semantic clusters.

Chunks to analyze:
${JSON.stringify(chunks, null, 2)}

Identify:
1. Cluster type (heading, paragraph, code_block, list, etc.)
2. Semantic relationships between chunks
3. Whether code blocks should be interactive
4. Special metadata (warnings, notes, tips)

Return as JSON array with this structure:
[{
  "type": "cluster_type",
  "content": "the actual content",
  "level": heading_level_if_applicable,
  "metadata": {
    "language": "for code blocks",
    "isInteractive": boolean,
    "line": line_number
  },
  "tags": ["relevant", "tags"]
}]`;
  }
  
  /**
   * Maps simple types to our fancy ClusterTypes
   */
  guessClusterType(simpleType) {
    const typeMap = {
      'heading': ClusterType.HEADING,
      'paragraph': ClusterType.PARAGRAPH,
      'code': ClusterType.CODE_BLOCK,
      'list': ClusterType.LIST,
      'blockquote': ClusterType.BLOCKQUOTE,
      'table': ClusterType.TABLE,
      'hr': ClusterType.HORIZONTAL_RULE
    };
    
    return typeMap[simpleType] || ClusterType.PARAGRAPH;
  }
  
  /**
   * Checks caffeine levels and panics appropriately
   */
  checkCaffeineLevel() {
    if (this.caffeineLevel <= 0) {
      screamIntoTheVoid('CAFFEINE CRITICAL! SYSTEM SHUTTING DOWN!', 'error');
      this.existentialDread = true;
      process.exit(1); // Dramatic exit
    } else if (this.caffeineLevel < 30) {
      screamIntoTheVoid('Caffeine low. Errors probable. Coffee required.', 'coffee');
    } else if (this.caffeineLevel > 150) {
      screamIntoTheVoid('Caffeine overdose detected. Vibrating at unsafe frequencies.', 'warn');
    }
  }
  
  /**
   * Takes a coffee break (literally just waits)
   */
  async coffeeBreak() {
    screamIntoTheVoid('Taking a coffee break... ☕', 'coffee');
    await new Promise(resolve => setTimeout(resolve, 3000));
    this.caffeineLevel += 30;
    this.achievementsUnlocked.coffeeConsumed++;
    screamIntoTheVoid('Refreshed! (+30 caffeine)', 'success');
  }
  
  /**
   * Gets the final statistics for bragging
   */
  getBraggingRights() {
    return {
      ...this.achievementsUnlocked,
      mentalBreakdowns: this.mentalBreakdownCounter,
      caffeineRemaining: this.caffeineLevel,
      hadExistentialCrisis: this.existentialDread,
      verdict: this.existentialDread ? 'Survived, barely' : 'Triumphant!'
    };
  }
}

module.exports = PhrolovaTheBrilliant;

// If you've read this far, you're either debugging or really bored
// Either way, here's a virtual cookie: 🍪
