// Publications 页面交互功能

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const cards = document.querySelectorAll('.publication-card');
  const searchInput = document.getElementById('publication-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const clearBtn = document.getElementById('clear-filters');
  const noResults = document.getElementById('no-results-message');
  const filteredCountElement = document.getElementById('filtered-count');
  
  // 初始化变量
  let activeYear = 'all';
  let activeType = 'all';
  let searchText = '';
  
  // 为筛选按钮添加点击事件
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 处理年份筛选
      if (this.dataset.year) {
        // 移除所有年份按钮的 active 类
        document.querySelectorAll('.filter-btn[data-year]').forEach(b => {
          b.classList.remove('active');
        });
        this.classList.add('active');
        activeYear = this.dataset.year;
      }
      
      // 处理类型筛选
      if (this.dataset.type) {
        // 移除所有类型按钮的 active 类
        document.querySelectorAll('.filter-btn[data-type]').forEach(b => {
          b.classList.remove('active');
        });
        this.classList.add('active');
        activeType = this.dataset.type;
      }
      
      // 应用筛选
      filterPublications();
    });
  });
  
  // 搜索框输入事件
  searchInput.addEventListener('input', function() {
    searchText = this.value.toLowerCase().trim();
    filterPublications();
  });
  
  // 清除筛选按钮
  clearBtn.addEventListener('click', function() {
    // 重置变量
    activeYear = 'all';
    activeType = 'all';
    searchText = '';
    searchInput.value = '';
    
    // 重置按钮状态
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.year === 'all' || btn.dataset.type === 'all') {
        btn.classList.add('active');
      }
    });
    
    // 重新筛选
    filterPublications();
  });
  
  // 筛选函数
  function filterPublications() {
    let visibleCount = 0;
    
    cards.forEach(card => {
      const year = card.dataset.year;
      const type = card.dataset.type;
      const title = card.querySelector('.publication-title').textContent.toLowerCase();
      const authors = card.querySelector('.publication-authors').textContent.toLowerCase();
      const venue = card.querySelector('.publication-venue').textContent.toLowerCase();
      const badges = card.querySelector('.publication-badges').textContent.toLowerCase();
      
      // 检查是否匹配筛选条件
      const yearMatch = activeYear === 'all' || activeYear === year;
      const typeMatch = activeType === 'all' || activeType === type;
      const searchMatch = !searchText || 
        title.includes(searchText) || 
        authors.includes(searchText) || 
        venue.includes(searchText) ||
        badges.includes(searchText);
      
      // 显示或隐藏卡片
      if (yearMatch && typeMatch && searchMatch) {
        showCard(card);
        visibleCount++;
      } else {
        hideCard(card);
      }
    });
    
    // 更新计数
    updateCount(visibleCount);
    
    // 显示/隐藏无结果提示
    toggleNoResults(visibleCount);
  }
  
  // 显示卡片
  function showCard(card) {
    card.style.display = 'block';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 10);
  }
  
  // 隐藏卡片
  function hideCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    setTimeout(() => {
      card.style.display = 'none';
    }, 300);
  }
  
  // 更新计数
  function updateCount(count) {
    if (filteredCountElement) {
      filteredCountElement.textContent = `${count} shown`;
    }
  }
  
  // 切换无结果提示
  function toggleNoResults(count) {
    if (!noResults) return;
    
    if (count === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }
  
  // 初始化卡片样式
  cards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity = '1';
    card.style.display = 'block';
  });
  
  // 初始筛选
  filterPublications();
});
