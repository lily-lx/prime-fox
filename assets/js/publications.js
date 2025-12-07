document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.publication-card');
  const searchInput = document.getElementById('publication-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const clearBtn = document.getElementById('clear-filters');
  const noResults = document.getElementById('no-results-message');
  
  let activeYear = 'all';
  let activeType = 'all';
  let searchText = '';
  
  // 筛选按钮点击
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 更新活动按钮状态
      if (this.dataset.year) {
        // 移除所有年份按钮的 active 类
        document.querySelectorAll('.filter-btn[data-year]').forEach(b => {
          b.classList.remove('active');
        });
        this.classList.add('active');
        activeYear = this.dataset.year;
      }
      
      if (this.dataset.type) {
        // 移除所有类型按钮的 active 类
        document.querySelectorAll('.filter-btn[data-type]').forEach(b => {
          b.classList.remove('active');
        });
        this.classList.add('active');
        activeType = this.dataset.type;
      }
      
      filterPublications();
    });
  });
  
  // 搜索功能
  searchInput.addEventListener('input', function() {
    searchText = this.value.toLowerCase().trim();
    filterPublications();
  });
  
  // 清除筛选
  clearBtn.addEventListener('click', function() {
    activeYear = 'all';
    activeType = 'all';
    searchText = '';
    searchInput.value = '';
    
    // 重置所有按钮状态
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.year === 'all' || btn.dataset.type === 'all') {
        btn.classList.add('active');
      }
    });
    
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
      
      // 应用筛选条件
      const yearMatch = activeYear === 'all' || activeYear === year;
      const typeMatch = activeType === 'all' || activeType === type;
      
      // 搜索匹配
      const searchMatch = !searchText || 
        title.includes(searchText) || 
        authors.includes(searchText) || 
        venue.includes(searchText) ||
        badges.includes(searchText);
      
      if (yearMatch && typeMatch && searchMatch) {
        card.style.display = 'block';
        // 添加淡入动画
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
        visibleCount++;
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
    
    // 更新计数
    const filteredCountElement = document.getElementById('filtered-count');
    if (filteredCountElement) {
      filteredCountElement.textContent = `${visibleCount} shown`;
    }
    
    // 显示/隐藏无结果提示
    if (noResults) {
      if (visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
  }
  
  // 初始化卡片样式
  cards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity = '1';
    card.style.display = 'block';
  });
});
