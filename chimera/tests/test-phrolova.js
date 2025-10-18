/**
 * Test Runner for Phrolova - The Paranoid Parsing Engine
 * 
 * This test script will:
 * 1. Take your markdown
 * 2. Feed it to Phrolova
 * 3. Show you the magic (or disasters) that happen
 * 
 * Run with: node test-phrolova.js
 */

const PhrolovaTheBrilliant = require('../src/core/phrolova');
const fs = require('fs').promises;
const chalk = require('chalk');
const path = require('path');

// Our test logger (with personality, obviously)
const testLog = (message, type = 'info') => {
  const prefixes = {
    start: chalk.cyan('[TEST-START]'),
    info: chalk.blue('[TEST-INFO]'),
    success: chalk.green('[TEST-SUCCESS]'),
    error: chalk.red('[TEST-FAILED]'),
    result: chalk.magenta('[TEST-RESULT]'),
    end: chalk.yellow('[TEST-END]')
  };
  
  console.log(`${prefixes[type]} ${message}`);
};

// The almighty test function
async function testPhrolovaWithYourMarkdown() {
  testLog('Initializing Phrolova test sequence...', 'start');
  testLog('This is where markdown goes to become something beautiful... or crashes trying', 'info');
  
  try {
    // Step 1: Create Phrolova instance
    testLog('Summoning Phrolova from the digital void...', 'info');
    const phrolovaInstance = new PhrolovaTheBrilliant();
    
    // Give it a moment to wake up
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Set up test markdown path
    const testMarkdownPath = path.join(__dirname, 'Input', 'input.md');
    
    // Check if file exists
    try {
      await fs.access(testMarkdownPath);
      testLog(`Found test markdown at: ${testMarkdownPath}`, 'success');
    } catch {
      testLog(`No test markdown found at: ${testMarkdownPath}`, 'error');
      testLog('Please create the file or update the path!', 'error');
      return;
    }
    
    // Step 3: Let Phrolova digest the document
    testLog('Feeding markdown to Phrolova... *crosses fingers*', 'info');
    console.log(chalk.gray('═'.repeat(60)));
    
    const startTime = Date.now();
    const documentManifest = await phrolovaInstance.digestDocument(testMarkdownPath);
    const elapsedTime = Date.now() - startTime;
    
    console.log(chalk.gray('═'.repeat(60)));
    
    // Step 4: Analyze results
    if (documentManifest) {
      testLog('PHROLOVA SURVIVED! Document successfully parsed!', 'success');
      testLog(`Parsing completed in ${elapsedTime}ms`, 'info');
      
      // Display statistics
      console.log('\n' + chalk.cyan('PARSING STATISTICS:'));
      console.log(chalk.white('├─ Total Lines Processed: ') + chalk.yellow(documentManifest.metadata.totalLines));
      console.log(chalk.white('├─ Clusters Created: ') + chalk.yellow(documentManifest.metadata.totalClusters));
      console.log(chalk.white('├─ Parse Time: ') + chalk.yellow(`${documentManifest.metadata.parseTime}ms`));
      console.log(chalk.white('└─ Document ID: ') + chalk.yellow(documentManifest.id));
      
      // Show cluster breakdown
      if (documentManifest.stats && documentManifest.stats.clusterTypes) {
        console.log('\n' + chalk.cyan('CLUSTER BREAKDOWN:'));
        Object.entries(documentManifest.stats.clusterTypes).forEach(([type, count]) => {
          console.log(chalk.white(`├─ ${type}: `) + chalk.green(count));
        });
      }
      
      // Show language detection
      if (documentManifest.stats.languages && Object.keys(documentManifest.stats.languages).length > 0) {
        console.log('\n' + chalk.cyan('LANGUAGES DETECTED:'));
        Object.entries(documentManifest.stats.languages).forEach(([lang, count]) => {
          console.log(chalk.white(`├─ ${lang}: `) + chalk.blue(count));
        });
      }
      
      // Show table of contents
      if (documentManifest.metadata.toc && documentManifest.metadata.toc.length > 0) {
        console.log('\n' + chalk.cyan('TABLE OF CONTENTS:'));
        documentManifest.metadata.toc.forEach(item => {
          const level = item.level || 1;
          const indent = '  '.repeat(Math.max(0, level - 1));
          const text = item.text || item.content || '[No Title]';
          console.log(chalk.white(`${indent}├─ `) + chalk.yellow(text));
        });
      }
      
      // Show sample clusters (first 3)
      console.log('\n' + chalk.cyan('SAMPLE CLUSTERS (First 3):'));
      documentManifest.clusters.slice(0, 3).forEach((cluster, index) => {
        console.log(chalk.white(`\n[Cluster ${index + 1}]`));
        console.log(chalk.gray('├─ Type: ') + chalk.magenta(cluster.type));
        console.log(chalk.gray('├─ ID: ') + chalk.dim(cluster.id));
        if (cluster.metadata && cluster.metadata.language) {
          console.log(chalk.gray('├─ Language: ') + chalk.green(cluster.metadata.language));
        }
        const content = String(cluster.content || '');
        const preview = content.substring(0, 100).replace(/\n/g, ' ');
        console.log(chalk.gray('└─ Content: ') + chalk.white(`"${preview}${content.length > 100 ? '...' : ''}"`));
      });
      
      // Get Phrolova's bragging rights
      const braggingRights = phrolovaInstance.getBraggingRights();
      console.log('\n' + chalk.cyan('PHROLOVA\'S BRAGGING RIGHTS:'));
      console.log(chalk.white('├─ Lines Conquered: ') + chalk.yellow(braggingRights.linesConquered));
      console.log(chalk.white('├─ Clusters Forged: ') + chalk.yellow(braggingRights.clustersForged));
      console.log(chalk.white('├─ Mental Breakdowns: ') + chalk.red(braggingRights.mentalBreakdowns));
      console.log(chalk.white('├─ Coffee Consumed: ') + chalk.rgb(139, 69, 19)(braggingRights.coffeeConsumed + ' cups'));
      console.log(chalk.white('├─ Caffeine Level: ') + chalk.green(braggingRights.caffeineRemaining + '%'));
      console.log(chalk.white('├─ Time Wasted: ') + chalk.yellow(braggingRights.timeWasted + 'ms'));
      console.log(chalk.white('└─ Final Verdict: ') + chalk.magenta(braggingRights.verdict));
      
      // Save the manifest to file for inspection
      const outputPath = path.join(__dirname, 'output', 'manifest.json');
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, JSON.stringify(documentManifest.toJSON(), null, 2));
      testLog(`Manifest saved to: ${outputPath}`, 'success');
      
      // Show any errors or warnings
      if (documentManifest.errors.length > 0) {
        console.log('\n' + chalk.red('ERRORS:'));
        documentManifest.errors.forEach(err => console.log(chalk.red(`  - ${err}`)));
      }
      
      if (documentManifest.warnings.length > 0) {
        console.log('\n' + chalk.yellow('WARNINGS:'));
        documentManifest.warnings.forEach(warn => console.log(chalk.yellow(`  - ${warn}`)));
      }
      
    } else {
      testLog('Phrolova failed to parse the document. Check the logs above!', 'error');
      testLog('Mental breakdown counter probably exceeded maximum...', 'error');
    }
    
  } catch (catastrophicFailure) {
    testLog(`CATASTROPHIC FAILURE: ${catastrophicFailure.message}`, 'error');
    console.error(chalk.red('Stack trace for the curious:'));
    console.error(chalk.dim(catastrophicFailure.stack));
    
    testLog('Phrolova needs more coffee... or therapy', 'error');
  } finally {
    testLog('Test sequence complete. Thank you for testing Phrolova!', 'end');
    console.log(chalk.gray('═'.repeat(60)));
    
    // Easter egg
    if (Math.random() > 0.7) {
      console.log(chalk.dim('\n// Phrolova whispers: "Did I do good?"'));
    }
  }
}

// Check if we should run immediately or wait for import
if (require.main === module) {
  console.log(chalk.cyan.bold('\n╔════════════════════════════════════════╗'));
  console.log(chalk.cyan.bold('║  PHROLOVA TEST RUNNER - CHIMERA v1.0  ║'));
  console.log(chalk.cyan.bold('╚════════════════════════════════════════╝\n'));
  
  // Create .env file reminder
  testLog('Make sure you have your API key set in .env file!', 'info');
  testLog('OPENAI_API_KEY=your-key-here or ANTHROPIC_API_KEY=your-key-here', 'info');
  console.log('');
  
  // Run the test
  testPhrolovaWithYourMarkdown().catch(err => {
    console.error(chalk.red('Unhandled error in test runner:'), err);
    process.exit(1);
  });
}

module.exports = { testPhrolovaWithYourMarkdown };

// Remember: If Phrolova breaks, it's not a bug, it's a feature
// It's just having an existential crisis about your markdown
