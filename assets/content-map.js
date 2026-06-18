// assets/content-map.js
// Site content partition, keyword tags, and simple search filter functions

const contentMap = {
  partitions: [
    { id: 1, name: "新闻动态", slug: "news" },
    { id: 2, name: "产品中心", slug: "products" },
    { id: 3, name: "技术支持", slug: "support" },
    { id: 4, name: "关于我们", slug: "about" },
    { id: 5, name: "开云专区", slug: "kaiyun-zone" }
  ],
  tags: [
    "开云", "云服务", "数据安全", "AI平台", "边缘计算",
    "物联网", "开源工具", "DevOps", "容器化", "微服务",
    "API网关", "自动化", "监控告警", "日志分析", "备份恢复"
  ],
  samples: [
    { title: "开云平台升级公告", partition: "news", tags: ["开云", "云服务"], url: "https://yun-access.com.cn/news/upgrade" },
    { title: "开云边缘节点部署指南", partition: "support", tags: ["开云", "边缘计算"], url: "https://yun-access.com.cn/support/edge" },
    { title: "AI模型训练最佳实践", partition: "products", tags: ["AI平台", "开云"], url: "https://yun-access.com.cn/products/ai-training" },
    { title: "开云容器化解决方案", partition: "products", tags: ["开云", "容器化"], url: "https://yun-access.com.cn/products/container" },
    { title: "开源工具集成开云API", partition: "support", tags: ["开源工具", "开云", "API网关"], url: "https://yun-access.com.cn/support/openapi" }
  ]
};

function getPartitionBySlug(slug) {
  return contentMap.partitions.find(p => p.slug === slug) || null;
}

function getPartitionName(slug) {
  const part = getPartitionBySlug(slug);
  return part ? part.name : "未知分区";
}

function filterByTag(tag) {
  const lowerTag = tag.toLowerCase();
  return contentMap.samples.filter(item =>
    item.tags.some(t => t.toLowerCase().includes(lowerTag))
  );
}

function filterByPartition(partitionSlug) {
  return contentMap.samples.filter(item => item.partition === partitionSlug);
}

function searchContent(query) {
  if (!query || query.trim() === "") return [];
  const lowerQuery = query.toLowerCase();
  const results = [];
  const seen = new Set();
  contentMap.samples.forEach(item => {
    const matchTitle = item.title.toLowerCase().includes(lowerQuery);
    const matchTags = item.tags.some(t => t.toLowerCase().includes(lowerQuery));
    const matchPartition = item.partition.toLowerCase().includes(lowerQuery);
    if (matchTitle || matchTags || matchPartition) {
      const key = item.url + item.title;
      if (!seen.has(key)) {
        seen.add(key);
        results.push(item);
      }
    }
  });
  return results;
}

function listAllTags() {
  return [...contentMap.tags];
}

function getSamplesCount() {
  return contentMap.samples.length;
}

function addSample(sample) {
  if (!sample || !sample.title || !sample.partition || !sample.tags || !sample.url) {
    return false;
  }
  const exists = contentMap.samples.some(s => s.url === sample.url);
  if (exists) return false;
  contentMap.samples.push({
    title: sample.title,
    partition: sample.partition,
    tags: sample.tags.slice(),
    url: sample.url
  });
  return true;
}

export {
  contentMap,
  getPartitionBySlug,
  getPartitionName,
  filterByTag,
  filterByPartition,
  searchContent,
  listAllTags,
  getSamplesCount,
  addSample
};