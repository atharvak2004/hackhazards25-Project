// fetchAndStoreTrends.js

const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
require('dotenv').config();

const TrendingSkill = require('./models/TrendingSkill');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected")).catch(err => console.error(err));

async function fetchStackOverflowTags() {
  const url = 'https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow';
  const res = await axios.get(url);
  return res.data.items.map(tag => ({
    name: tag.name.toLowerCase(),
    count: tag.count,
    source: 'StackOverflow'
  }));
}

async function fetchGitHubTrendingTopics() {
  const url = 'https://github.com/trending';
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const topics = {};

  $('article.Box-row').each((_, el) => {
    const lang = $(el).find('[itemprop="programmingLanguage"]').text().trim().toLowerCase();
    if (lang) {
      topics[lang] = (topics[lang] || 0) + 1;
    }
  });

  return Object.entries(topics).map(([name, count]) => ({
    name,
    count,
    source: 'GitHub'
  }));
}

async function mergeAndStoreTrends() {
  const stackTags = await fetchStackOverflowTags();
  const githubLangs = await fetchGitHubTrendingTopics();

  const merged = {};

  for (let tag of stackTags) {
    merged[tag.name] = { name: tag.name, count: tag.count };
  }

  for (let lang of githubLangs) {
    if (merged[lang.name]) {
      merged[lang.name].count += lang.count;
    } else {
      merged[lang.name] = { name: lang.name, count: lang.count };
    }
  }

  const finalSkills = Object.values(merged);

  for (let skill of finalSkills) {
    await TrendingSkill.findOneAndUpdate(
      { name: skill.name },
      {
        name: skill.name,
        count: skill.count,
        source: 'combined',
        fetchedAt: new Date()
      },
      { upsert: true, new: true }
    );
  }

  console.log(`Inserted/Updated ${finalSkills.length} trending skills`);
  mongoose.disconnect();
}

mergeAndStoreTrends();
