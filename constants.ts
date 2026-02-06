
import { Demo, Subject, Language, Layer } from './types';

export const DICTIONARY = {
  en: {
    appTitle: "Sci-Demo Hub",
    explore: "Explore",
    bounties: "Bounties",
    upload: "Upload",
    admin: "Admin",
    profile: "Profile",
    searchPlaceholder: "Search demos (Cmd+K)...",
    
    // Auth & Roles
    loginTitle: "Select Identity",
    loginSubtitle: "Choose your access level to enter the laboratory.",
    roleUser: "Researcher",
    roleUserDesc: "Browse demos, view code, create or join communities.",
    roleGeneralAdmin: "Chief Administrator",
    roleGeneralAdminDesc: "Manage General Library and oversee all Communities.",
    welcomeBack: "Welcome back,",
    logout: "Log Out",
    accessLevel: "Access Level",
    
    // Profile
    profileTitle: "Researcher Profile",
    accountType: "Account Type",
    memberSince: "Member Since",
    contributions: "Contributions",
    createCommunity: "Create Community",
    myCommunities: "My Communities",
    communityStatus: "Status",
    
    subjects: "Subjects",
    all: "All Categories",
    open: "Open",
    details: "Details",
    code: "Source Code",
    aiHelper: "AI Helper",
    concept: "Scientific Concept",
    refresh: "Refresh",
    fullscreen: "Fullscreen",
    close: "Close",
    uploadTitle: "Submit New Demo",
    stepInfo: "Basic Info",
    stepEditor: "Code Editor",
    stepPreview: "Preview",
    titleLabel: "Title",
    authorLabel: "Author",
    descLabel: "Description",
    subjectLabel: "Category / Subject",
    coverImage: "Cover Image",
    uploadCover: "Upload Cover",
    next: "Next",
    back: "Back",
    submit: "Submit",
    pending: "Pending Review",
    approved: "Approved",
    rejected: "Rejected",
    adminDashboard: "Governance Hub",
    approve: "Approve",
    reject: "Reject",
    statsTotal: "Total Demos",
    statsPending: "Pending Review",
    statsUsers: "Active Users",
    emptyPending: "No pending items found.",
    aiChatTitle: "AI Lab Assistant",
    aiChatPlaceholder: "Ask about science or demos...",
    successMsg: "Operation successful!",
    physics: "Physics",
    chemistry: "Chemistry",
    mathematics: "Mathematics",
    biology: "Biology",
    computerScience: "Computer Science",
    astronomy: "Astronomy",
    earthScience: "Earth Science",
    creativeTools: "Creative Tools",
    // New translations
    layerGeneral: "General Library",
    layerCommunity: "Community Hub",
    addCategory: "New Category",
    addSubCategory: "Add Sub-category",
    deleteCategory: "Delete",
    enterCategoryName: "Enter category name:",
    communityRoot: "Community Root",
    selectLayer: "Select Layer",
    confirmDeleteCat: "Delete this category and all its contents?",
    confirmDeleteBounty: "Delete this bounty permanently?",
    confirmDeleteDemo: "Delete this demo?",
    // Bounty
    bountyHall: "Bounty Hall",
    bountyDesc: "Explore and solve open scientific challenges to earn rewards.",
    createBounty: "Create Bounty",
    reward: "Reward",
    // Community Features
    communityHall: "Community Hall",
    selectCommunity: "Select Community",
    joinByCode: "Join by Code",
    enterCode: "Enter 12-digit Community Code",
    join: "Join",
    requestJoin: "Request to Join",
    member: "Member",
    communityName: "Community Name",
    communityDesc: "Description",
    createCommunityTitle: "Establish New Community",
    communityCode: "Community Code",
    members: "Members",
    manageMembers: "Manage Members",
    pendingRequests: "Pending Requests",
    accept: "Accept",
    kick: "Kick",
    deleteCommunity: "Delete Community",
    noCommunities: "You haven't joined any communities yet.",
    waitingApproval: "Waiting for General Admin approval.",
    generalAdminView: "Super Admin View",
    communityReview: "Community Review",
    
    // Bounty
    bountyStatus: "Status",
    openBounties: "Open Tasks",
    closedBounties: "Closed",
    submitSolution: "Submit Solution",
    bountyTitle: "Task Title",
    bountyRewardPlaceholder: "e.g. $50 Credit, Featured Spot...",
    create: "Create",
    activeBounties: "Active Bounties",
    submittingFor: "Submitting solution for task:",
    bountySolution: "Bounty Solution",
    noActiveBounties: "No active bounties at the moment.",
    noDemosFound: "No demos found",
    tryAdjusting: "Try adjusting your filters or search query",
    chatWelcome: "Welcome to Sci-Demo Hub! How can I assist your research today?",
    editCover: "Edit Cover",
    updateCoverTitle: "Update Demo Cover",
    cancel: "Cancel",
    save: "Save",
    coverUpdated: "Cover image updated successfully.",
    delete: "Delete",
    by: "by",
    running: "Running",
    didYouKnow: "Did you know?",
    didYouKnowText: "This simulation runs in real-time. You can modify the parameters in the code tab to see how the physics changes!",
    suggestedQuestions: "Suggested Questions",
    analyzing: "Analyzing demo code...",
    explainMath: "Explain the math",
    changeColor: "How to change color?",
    makeFaster: "Make it faster",
    readOnly: "Read-only"
  },
  cn: {
    appTitle: "科学演示集市",
    explore: "探索",
    bounties: "悬赏大厅",
    upload: "上传",
    admin: "管理",
    profile: "个人主页",
    searchPlaceholder: "搜索演示 (Cmd+K)...",

    // Auth & Roles
    loginTitle: "选择身份",
    loginSubtitle: "选择您的访问权限以进入实验室。",
    roleUser: "科研人员",
    roleUserDesc: "浏览演示，加入或创建科研社区。",
    roleGeneralAdmin: "总管理员",
    roleGeneralAdminDesc: "管理通用知识库，审核并监管所有社区。",
    welcomeBack: "欢迎回来，",
    logout: "退出登录",
    accessLevel: "访问级别",

    // Profile
    profileTitle: "研究员档案",
    accountType: "账户类型",
    memberSince: "注册时间",
    contributions: "贡献统计",
    createCommunity: "创建社区",
    myCommunities: "我的社区",
    communityStatus: "状态",

    subjects: "学科分类",
    all: "全部分类",
    open: "打开",
    details: "详情",
    code: "源代码",
    aiHelper: "AI 助手",
    concept: "科学原理",
    refresh: "刷新",
    fullscreen: "全屏",
    close: "关闭",
    uploadTitle: "提交新演示",
    stepInfo: "基本信息",
    stepEditor: "代码编辑",
    stepPreview: "预览",
    titleLabel: "标题",
    authorLabel: "作者",
    descLabel: "描述",
    subjectLabel: "分类 / 学科",
    coverImage: "封面图片",
    uploadCover: "上传封面",
    next: "下一步",
    back: "返回",
    submit: "提交",
    pending: "待审核",
    approved: "已通过",
    rejected: "已拒绝",
    adminDashboard: "治理中心",
    approve: "通过",
    reject: "拒绝",
    statsTotal: "演示总数",
    statsPending: "待审核",
    statsUsers: "活跃用户",
    emptyPending: "暂无待处理项。",
    aiChatTitle: "AI 实验室助手",
    aiChatPlaceholder: "询问科学知识或演示...",
    successMsg: "操作成功！",
    physics: "物理",
    chemistry: "化学",
    mathematics: "数学",
    biology: "生物",
    computerScience: "计算机科学",
    astronomy: "天文学",
    earthScience: "地球科学",
    creativeTools: "创意工具",
    // New translations
    layerGeneral: "通用知识库",
    layerCommunity: "社区中心",
    addCategory: "新建分类",
    addSubCategory: "添加子分类",
    deleteCategory: "删除",
    enterCategoryName: "输入分类名称:",
    communityRoot: "社区根目录",
    selectLayer: "选择区域",
    confirmDeleteCat: "确定删除此分类及其所有内容吗？",
    confirmDeleteBounty: "永久删除此悬赏任务？",
    confirmDeleteDemo: "删除此演示？",
    // Bounty
    bountyHall: "悬赏任务",
    bountyDesc: "探索并解决开放的科学挑战以获得奖励。",
    createBounty: "发布悬赏",
    reward: "奖励",
    // Community
    communityHall: "社区大厅",
    selectCommunity: "选择社区",
    joinByCode: "使用代码加入",
    enterCode: "输入12位社区代码",
    join: "加入",
    requestJoin: "申请加入",
    member: "成员",
    communityName: "社区名称",
    communityDesc: "社区描述",
    createCommunityTitle: "建立新社区",
    communityCode: "社区代码",
    members: "成员列表",
    manageMembers: "成员管理",
    pendingRequests: "待处理申请",
    accept: "接受",
    kick: "移除",
    deleteCommunity: "删除社区",
    noCommunities: "您尚未加入任何社区。",
    waitingApproval: "等待总管理员审核。",
    generalAdminView: "超级管理员视角",
    communityReview: "社区审核",
    
    // Bounty
    bountyStatus: "状态",
    openBounties: "进行中",
    closedBounties: "已结束",
    submitSolution: "提交方案",
    bountyTitle: "任务标题",
    bountyRewardPlaceholder: "例如: 50积分, 首页推荐位...",
    create: "创建",
    activeBounties: "活跃任务",
    submittingFor: "正在提交解决方案：",
    bountySolution: "悬赏方案",
    noActiveBounties: "暂无活跃的悬赏任务。",
    noDemosFound: "未找到演示",
    tryAdjusting: "尝试调整筛选条件或搜索关键词",
    chatWelcome: "欢迎来到科学演示集市！今天有什么可以帮您的吗？",
    editCover: "修改封面",
    updateCoverTitle: "更新演示封面",
    cancel: "取消",
    save: "保存",
    coverUpdated: "封面图片已更新。",
    delete: "删除",
    by: "作者",
    running: "运行中",
    didYouKnow: "你知道吗？",
    didYouKnowText: "这是一个实时模拟。你可以在代码标签页修改参数，观察物理现象的变化！",
    suggestedQuestions: "建议提问",
    analyzing: "正在分析代码...",
    explainMath: "解释数学原理",
    changeColor: "如何改变颜色？",
    makeFaster: "让它变快点",
    readOnly: "只读"
  }
};

export const SEED_DEMOS: Demo[] = [
  {
    id: 'seed-1',
    title: 'Elastic Collision Simulation',
    categoryId: Subject.Physics,
    layer: 'general',
    author: 'Dr. Newton',
    description: 'A real-time canvas simulation of perfectly elastic collisions between particles.',
    status: 'published',
    createdAt: Date.now(),
    code: `<!DOCTYPE html>
<html>
<body style="margin:0; overflow:hidden; background:#0f172a;">
<canvas id="c"></canvas>
<script>
const c = document.getElementById('c');
const ctx = c.getContext('2d');
c.width = window.innerWidth;
c.height = window.innerHeight;

class Ball {
  constructor(x, y, r, dx, dy, color) {
    this.x = x; this.y = y; this.r = r;
    this.dx = dx; this.dy = dy; this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    if (this.x + this.r > c.width || this.x - this.r < 0) this.dx = -this.dx;
    if (this.y + this.r > c.height || this.y - this.r < 0) this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

const balls = [];
for(let i=0; i<20; i++) {
  const r = 15;
  const x = Math.random() * (c.width - r*2) + r;
  const y = Math.random() * (c.height - r*2) + r;
  const dx = (Math.random() - 0.5) * 8;
  const dy = (Math.random() - 0.5) * 8;
  balls.push(new Ball(x, y, r, dx, dy, \`hsl(\${Math.random()*360}, 70%, 60%)\`));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
  ctx.fillRect(0, 0, c.width, c.height);
  balls.forEach(b => b.update());
}
animate();
</script>
</body>
</html>`
  },
  {
    id: 'seed-2',
    title: 'Fibonacci Spiral',
    categoryId: Subject.Mathematics,
    layer: 'general',
    author: 'Fibonacci Fan',
    description: 'Visualizing the Golden Ratio through a recursive spiral pattern.',
    status: 'published',
    createdAt: Date.now() - 100000,
    code: `<!DOCTYPE html>
<html>
<body style="margin:0; overflow:hidden; display:flex; justify-content:center; align-items:center; height:100vh; background:#fff;">
<canvas id="canvas"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cx = canvas.width / 2;
const cy = canvas.height / 2;
let angle = 0;

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  
  const scale = 5;
  for(let i=0; i<300; i++) {
    const r = scale * Math.sqrt(i);
    const theta = i * 2.39996; // Golden angle approx
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI*2);
    ctx.fillStyle = \`hsl(\${i + angle*50}, 80%, 50%)\`;
    ctx.fill();
  }
  ctx.restore();
  angle += 0.005;
  requestAnimationFrame(draw);
}
draw();
</script>
</body>
</html>`
  },
    {
    id: 'seed-3',
    title: 'Molecular Bond Vibration',
    categoryId: Subject.Chemistry,
    layer: 'general',
    author: 'Curie Lab',
    description: 'Simulated atomic bonds vibrating using a spring physics model.',
    status: 'published',
    createdAt: Date.now() - 200000,
    code: `<!DOCTYPE html>
<html>
<body style="margin:0; overflow:hidden; background:#f0f9ff;">
<canvas id="c"></canvas>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const atom1 = {x: canvas.width/2 - 100, y: canvas.height/2, vx: 0, vy: 0, r: 30, color: '#ef4444'};
const atom2 = {x: canvas.width/2 + 100, y: canvas.height/2, vx: 0, vy: 0, r: 30, color: '#3b82f6'};
const k = 0.05; // spring constant
const restLength = 200;
const damping = 0.95;

function update() {
  const dx = atom2.x - atom1.x;
  const dy = atom2.y - atom1.y;
  const dist = Math.sqrt(dx*dx + dy*dy);
  const force = (dist - restLength) * k;
  
  const fx = (dx / dist) * force;
  const fy = (dy / dist) * force;
  
  atom1.vx += fx; atom1.vy += fy;
  atom2.vx -= fx; atom2.vy -= fy;
  
  atom1.x += atom1.vx; atom1.y += atom1.vy;
  atom2.x += atom2.vx; atom2.y += atom2.vy;
  
  atom1.vx *= damping; atom1.vy *= damping;
  atom2.vx *= damping; atom2.vy *= damping;
  
  // Random thermal noise
  atom1.vx += (Math.random()-0.5);
  atom2.vx += (Math.random()-0.5);

  ctx.clearRect(0,0,canvas.width, canvas.height);
  
  // Bond
  ctx.beginPath();
  ctx.moveTo(atom1.x, atom1.y);
  ctx.lineTo(atom2.x, atom2.y);
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#94a3b8';
  ctx.stroke();
  
  // Atoms
  [atom1, atom2].forEach(a => {
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.r, 0, Math.PI*2);
    ctx.fillStyle = a.color;
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = a.color;
  });
  
  requestAnimationFrame(update);
}
update();
</script>
</body>
</html>`
  }
];

export const getTranslation = (lang: Language, key: keyof typeof DICTIONARY['en']) => {
  return DICTIONARY[lang][key] || key;
};
