/**
 * Config file for Chimera, the Ultimate HTML Parser.
 * Because every great parser needs a config file that nobody will ever change
 *  
 *  90% of these values were chosen by a random number generator
 *  This code is Pure caffeine-induced inspiration at 3 AM
 * When I'm wrote this code, me and god both knows what i was thinking,
 * but now god only knows it....
 * If you are stuck at any point, just blame the code and move on....
 */

const cosmicConstants = {
  // How many lines before we start questioning our life choices
  EXISTENTIAL_CRISIS_LINE_COUNT: 100000,
  
  // The point where we just give up and use regex for everything
  DESPERATION_THRESHOLD: 500000,
  
  // Maximum attempts before we blame the user's markdown
  MAX_RETRY_BEFORE_BLAME_USER: 3,
  
  // Coffee breaks needed per 100k lines (scientifically proven)
  COFFEE_BREAKS_PER_100K: 7
};

const phrolovaSecrets = {
  // If you're reading this, you're probably debugging at 2 AM. I'm sorry.
  llmModel: process.env.LLM_MODEL || 'claude-3-opus-20240229',
  
  // The magic number that makes everything work. Don't ask why.
  chunkSizeOfDestiny: 2048,
  
  // How patient are we today? (in milliseconds, like our remaining sanity)
  patienceTimeout: 30000,
  
  // The temperature at which our LLM becomes sentient and starts writing poetry
  creativityTemp: 0.7,
  
  // Maximum tokens before the LLM starts rambling about its childhood
  maxTokensBeforeExistentialDread: 4096,
  
  // How many times we retry before admitting the LLM is having a moment
  retryAttemptsForDramaticLLM: 3,
  
  // The sacred API key (hidden like my motivation on Mondays)
  apiKeyOfPower: process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || 'you-forgot-the-key-genius'
};

const workerPersonalities = {
  alto: {
    // Alto: The perfectionist HTML worker who judges your semantic choices
    name: 'Alto_The_Semantic_Purist',
    maxConcurrentTasks: 5,
    attitudeLevel: 'slightly-judgmental',
    preferredMood: 'methodical',
    htmlStandards: 'only-the-finest-html5',
    semanticSnobbishness: 9.5, // out of 10
    willingToCompromise: false,
    coffeePreference: 'black-like-my-soul'
  },
  
  mortefi: {
    // Mortefi: The CSS artist who thinks gradients solve everything
    name: 'Mortefi_Style_Overlord',
    maxConcurrentTasks: 3,
    attitudeLevel: 'dramatically-artistic',
    tailwindClasses: 'all-of-them',
    gradientObsession: true,
    shadowsEverywhere: true,
    animateAllTheThings: true,
    borderRadiusAddiction: '0.5rem', // it's always 0.5rem
    darkModeFirst: true, // because we're developers
    coffeePreference: 'artisanal-pour-over'
  },
  
  galbrena: {
    // Galbrena: The demo wizard who can make console.log look impressive
    name: 'Galbrena_Demo_Deity',
    maxConcurrentTasks: 2,
    attitudeLevel: 'show-off',
    sandboxSecurity: 'probably-fine',
    makeEverythingInteractive: true,
    particlesOnClick: true, // because why not
    soundEffects: false, // we're not monsters
    impressiveLevel: 11, // goes to 11
    coffeePreference: 'energy-drink-actually'
  },
  
  lupa: {
    // Lupa: The JavaScript orchestrator who promises not to use eval()
    name: 'Lupa_Promise_Keeper',
    maxConcurrentTasks: 10,
    attitudeLevel: 'cautiously-optimistic',
    useModernSyntax: true,
    arrowFunctionsOnly: true, // function keyword is dead to us
    asyncAwaitEverything: true,
    globalVariables: 0, // we're not savages
    jQueryAllowed: false, // it's 2025, come on
    coffeePreference: 'espresso-shots-directly-to-veins'
  },
  
  calcharo: {
    // Calcharo: The validator who has trust issues with everyone's code
    name: 'Calcharo_The_Pessimist',
    maxConcurrentTasks: 20, // because checking everything simultaneously
    attitudeLevel: 'perpetually-suspicious',
    paranoidLevel: 'maximum',
    trustNobody: true,
    assumeEverythingIsBroken: true,
    nitpickLevel: 'molecular',
    actuallyHelpful: true, // surprisingly
    coffeePreference: 'decaf', // the ultimate betrayal
  }
};

const performanceHacks = {
  // The secret sauce that makes 1M lines possible
  streamingMagic: {
    enabled: true,
    bufferSizeIChooseYou: 64 * 1024, // 64KB, because powers of 2 are lucky
    backpressureThreshold: 16, // when we start sweating
    flushWhenScared: true
  },
  
  // Parallel processing settings (may cause temporal paradoxes)
  parallelUniverses: {
    maxWorkerThreads: 8, // one for each CPU core's feelings
    quantumEntanglement: false, // experimental feature
    timeComplexity: 'O(no)', // we don't talk about it
    spaceComplexity: 'all-of-it'
  },
  
  // Caching strategy (aka "please don't make me parse this again")
  memoizationMadness: {
    enabled: true,
    maxCacheSize: '1GB', // or until Chrome cries
    cacheStrategy: 'LRU', // Least Recently Cared-About
    persistCache: true,
    cacheLocation: '.chimera-cache', // hidden like my bugs
    ttl: 3600000 // 1 hour, or one debugging session
  },
  
  // Memory management (prayers included)
  memoryJujitsu: {
    maxHeapSize: '4096m', // MOAR RAM
    gcInterval: 10000, // gentle nudges to the garbage collector
    leakDetection: true, // optimistic
    panicAt: '90%', // start praying
    ultimatePanicAt: '95%' // ctrl+c ctrl+c ctrl+c
  }
};

const outputConfig = {
  // Where dreams become HTML files
  destinationOfDreams: './output',
  
  // The final masterpiece filename
  masterpiece: 'index.html',
  
  // Prettify output (because we have standards... sometimes)
  prettifyOutput: true,
  prettifyLevel: 2, // spaces, because tabs are for heathens
  
  // Minification (when we need to hide our shame)
  minifyInProduction: true,
  minifyAggression: 'moderate', // 'gentle' | 'moderate' | 'destroyer-of-worlds'
  
  // Source maps (for when debugging becomes archaeological excavation)
  generateSourceMaps: true,
  embedSourceMaps: false, // keep them separate like my work and life
  
  // Assets handling
  inlineEverything: false, // we're not psychopaths
  assetOptimization: 'aggressive-but-respectful'
};

const debugConfig = {
  // Logging configuration (how much do you want to cry today?)
  verbosityLevel: process.env.DEBUG ? 'tell-me-everything' : 'just-the-disasters',
  
  // What to log (spoiler: everything when it breaks)
  logCategories: {
    parser: true,
    workers: true,
    llmConversations: process.env.DEBUG_LLM || false, // expensive to log
    performance: true,
    errors: true, // obviously
    warnings: true,
    sarcasm: true, // most important
    existentialCrisis: false // too real
  },
  
  // Console colors (because plain text is boring)
  useColors: true,
  unicorns: false, // set to true for rainbow mode
  
  // Timing everything (because we need metrics for our suffering)
  measureEverything: true,
  showTimings: true,
  benchmarkAgainst: 'speed-of-light' // always disappointing
};

const experimental = {
  // Features that might work, might summon demons
  quantumParsing: false, // parses in multiple states simultaneously
  aiSelfImprovement: false, // the LLM rewrites its own prompts
  telepathicUserIntent: false, // knows what you meant to write
  timeTravel: false, // undo before you even made the mistake
  asyncSyncAsync: false, // don't ask
  blazinglyFast: true, // it's just a boolean that does nothing
  webscale: true, // another confidence booster
  blockchain: false // absolutely not
};

// The mother of all configs
const ChimeraUltimateConfig = {
  cosmicConstants,
  phrolovaSecrets,
  workerPersonalities,
  performanceHacks,
  outputConfig,
  debugConfig,
  experimental,
  
  // Emergency settings
  panicButton: {
    enabled: true,
    threshold: 'everything-is-on-fire',
    action: 'blame-the-intern',
    sendDistressSignal: false,
    orderPizza: true // most important feature
  },
  
  // The version that started it all
  version: '1.0.0-still-in-denial',
  codename: 'Project-Chimera-May-Contain-Dragons',
  
  // Legal disclaimer
  disclaimer: 'Use at your own risk. Side effects may include: parsed content, beautiful HTML, occasional existential dread, and an irresistible urge to refactor everything.',
  
  // Hidden easter egg
  secretMessage: Buffer.from('TmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXAsIG5ldmVyIGdvbm5hIGxldCB5b3UgZG93bg==', 'base64').toString(),
  
  // The meaning of life, universe, and everything
  ultimateAnswer: 42
};

module.exports = ChimeraUltimateConfig;
