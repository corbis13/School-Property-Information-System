let assets = [];

const supabaseUrl = window.SUPABASE_CONFIG?.url || '';
const supabaseAnonKey = window.SUPABASE_CONFIG?.anonKey || '';
const supabaseHeaders = {
  apikey: supabaseAnonKey,
  Authorization: `Bearer ${supabaseAnonKey}`
};

function setMetricValue(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function parseMoney(value) {
  const numeric = Number(String(value || '0').replace(/[^0-9.-]+/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}

function normalizeStatus(status) {
  const value = String(status || '').trim().toLowerCase();
  if (!value) return 'Unspecified';
  if (value.includes('available')) return 'Available';
  if (value.includes('assigned') || value.includes('issued') || value.includes('in use')) return 'Issued';
  if (value.includes('borrow') || value.includes('loan')) return 'Borrowed';
  if (value.includes('repair') || value.includes('maintenance')) return 'Unserviceable';
  if (value.includes('serviceable') || value.includes('unserviceable')) return 'Unserviceable';
  if (value.includes('disposed')) return 'Disposed';
  return 'Available';
}

function formatCurrency(value) {
  return `₱${Number(value || 0).toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatDateLabel(value) {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

function mapAssetRow(row) {
  return {
    assetId: row.asset_id || row.assetId || '',
    propertyNo: row.property_no || row.propertyNo || '',
    itemBrandModel: row.item_brand_model || row.itemBrandModel || '',
    itemClassification: row.item_classification || row.itemClassification || '',
    accountable: row.accountable_person || row.accountable || '',
    status: row.status || '',
    total: row.total || 0,
    dateIssue: row.date_issue || row.dateIssue || '',
    createdAt: row.created_at || row.createdAt || '',
    updatedAt: row.updated_at || row.updatedAt || ''
  };
}

async function loadDashboardAssets() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/assets?select=asset_id,property_no,item_brand_model,item_classification,accountable_person,status,total,date_issue,created_at,updated_at`, {
    headers: supabaseHeaders
  });

  if (!response.ok) {
    throw new Error('Unable to load asset data');
  }

  const rows = await response.json();
  return (rows || []).map(mapAssetRow);
}

function updateDataStatus(message) {
  const statusNode = document.getElementById('dataStatus');
  if (statusNode) {
    statusNode.textContent = message;
  }
}

function buildDashboardMetrics() {
  const totalPropertyCount = assets.length;
  const available = assets.filter((item) => normalizeStatus(item.status) === 'Available').length;
  const issued = assets.filter((item) => normalizeStatus(item.status) === 'Issued').length;
  const borrowed = assets.filter((item) => normalizeStatus(item.status) === 'Borrowed').length;
  const unserviceable = assets.filter((item) => normalizeStatus(item.status) === 'Unserviceable').length;
  const totalPropertyValue = assets.reduce((sum, item) => sum + parseMoney(item.total), 0);

  setMetricValue('totalPropertyCount', totalPropertyCount.toLocaleString());
  setMetricValue('availableItems', available.toLocaleString());
  setMetricValue('issuedItems', issued.toLocaleString());
  setMetricValue('borrowedItems', borrowed.toLocaleString());
  setMetricValue('unserviceableItems', unserviceable.toLocaleString());
  setMetricValue('totalPropertyValue', formatCurrency(totalPropertyValue));
}

function buildRecentTransactions() {
  const list = document.getElementById('recentTransactions');
  if (!list) return;

  const sorted = [...assets]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 4);

  list.innerHTML = sorted.map((row) => `
    <li>
      <strong>${row.propertyNo || row.assetId}</strong>
      <small>${row.itemBrandModel || 'Asset'} • ${normalizeStatus(row.status)} • ${formatDateLabel(row.updatedAt || row.createdAt)}</small>
    </li>
  `).join('');
}

function buildLowStockAlerts() {
  const list = document.getElementById('lowStockAlerts');
  if (!list) return;

  const categoryCounts = assets.reduce((bucket, row) => {
    const name = String(row.itemClassification || 'Unknown').trim() || 'Unknown';
    bucket[name] = (bucket[name] || 0) + 1;
    return bucket;
  }, {});

  const alerts = Object.entries(categoryCounts)
    .filter(([, count]) => count <= 2)
    .map(([name, count]) => ({ item: name, quantity: count, threshold: 3 }));

  list.innerHTML = alerts.length
    ? alerts.map((row) => `
        <li>
          <strong>${row.item}</strong>
          <small>Stock ${row.quantity} | Reorder at ${row.threshold}</small>
        </li>
      `).join('')
    : '<li><strong>No low-stock alerts</strong><small>All categories are above threshold.</small></li>';
}

function buildMaintenance() {
  const list = document.getElementById('upcomingMaintenance');
  if (!list) return;

  const maintenanceItems = assets
    .filter((row) => normalizeStatus(row.status) === 'Unserviceable')
    .slice(0, 4);

  list.innerHTML = maintenanceItems.length
    ? maintenanceItems.map((row) => `
        <li>
          <strong>${row.propertyNo || row.assetId}</strong>
          <small>Due ${formatDateLabel(row.updatedAt || row.createdAt)} • ${row.itemBrandModel || 'Asset'}</small>
        </li>
      `).join('')
    : '<li><strong>No maintenance scheduled</strong><small>All active items are in good condition.</small></li>';
}

function buildActivityLog() {
  const list = document.getElementById('userActivityLog');
  if (!list) return;

  const logs = [...assets]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 4)
    .map((row) => ({
      action: `${normalizeStatus(row.status)} asset record for ${row.propertyNo || row.assetId}`,
      time: formatDateLabel(row.updatedAt || row.createdAt)
    }));

  list.innerHTML = logs.map((entry) => `
    <div class="log-item">
      <strong>${entry.action}</strong>
      <small>${entry.time}</small>
    </div>
  `).join('');
}

function buildCategoryData() {
  const counts = assets.reduce((bucket, row) => {
    const category = String(row.itemClassification || 'Unknown').trim() || 'Unknown';
    bucket[category] = (bucket[category] || 0) + 1;
    return bucket;
  }, {});

  return Object.entries(counts).map(([label, value]) => ({ label, value }));
}

function buildAccountablePersonData() {
  const counts = assets.reduce((bucket, row) => {
    const person = String(row.accountable || 'Unassigned').trim() || 'Unassigned';
    bucket[person] = (bucket[person] || 0) + 1;
    return bucket;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label, value]) => ({ label, value }));
}

function buildMonthlyIssuanceData() {
  const monthly = Array.from({ length: 12 }, (_, index) => ({ month: index, count: 0 }));

  assets.forEach((row) => {
    const raw = row.dateIssue || row.createdAt;
    if (!raw) return;
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return;
    const month = date.getMonth();
    monthly[month].count += 1;
  });

  return monthly;
}

function renderCharts() {
  const monthlyCtx = document.getElementById('monthlyIssuanceChart');
  const categoryCtx = document.getElementById('propertyCategoryChart');
  const accountableCtx = document.getElementById('accountablePersonChart');
  const monthlyData = buildMonthlyIssuanceData();
  const categoryData = buildCategoryData();
  const accountableData = buildAccountablePersonData();

  if (monthlyCtx && window.Chart) {
    new Chart(monthlyCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Monthly Issuance',
          data: monthlyData.map((entry) => entry.count),
          borderColor: '#00E5FF',
          backgroundColor: 'rgba(0, 229, 255, 0.16)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#FF4FA7',
          pointBorderColor: '#fff',
          pointRadius: 4
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: {
            ticks: { color: '#B9A4D8' },
            grid: { color: 'rgba(255,255,255,0.08)' }
          },
          x: {
            ticks: { color: '#B9A4D8' },
            grid: { display: false }
          }
        }
      }
    });
  }

  if (categoryCtx && window.Chart) {
    new Chart(categoryCtx, {
      type: 'doughnut',
      data: {
        labels: categoryData.map((entry) => entry.label),
        datasets: [{
          data: categoryData.map((entry) => entry.value),
          backgroundColor: ['#00E5FF', '#FF4FA7', '#FFD54A', '#53FF90', '#C6A0FF', '#76E5FF'],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: { color: '#F8F5FF', usePointStyle: true, boxWidth: 10 }
          }
        },
        cutout: '62%'
      }
    });
  }

  if (accountableCtx && window.Chart && accountableData.length) {
    new Chart(accountableCtx, {
      type: 'bar',
      data: {
        labels: accountableData.map((entry) => entry.label),
        datasets: [{
          label: 'Items Assigned',
          data: accountableData.map((entry) => entry.value),
          backgroundColor: '#FF4FA7',
          borderRadius: 8,
          borderSkipped: false,
          barThickness: 32
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#B9A4D8' },
            grid: { color: 'rgba(255,255,255,0.08)' }
          },
          x: {
            ticks: { color: '#B9A4D8' },
            grid: { display: false }
          }
        }
      }
    });
  }

}

async function initDashboard() {
  updateDataStatus('Loading live inventory data...');

  try {
    assets = await loadDashboardAssets();
    if (assets.length) {
      updateDataStatus(`Live data synced with ${assets.length} asset records`);
    } else {
      updateDataStatus('No asset records returned from the backend');
    }
  } catch {
    assets = [];
    updateDataStatus('Supabase data unavailable. Showing empty state');
  }

  buildDashboardMetrics();
  buildRecentTransactions();
  buildLowStockAlerts();
  buildMaintenance();
  buildActivityLog();
  renderCharts();
}

window.addEventListener('DOMContentLoaded', () => {
  const refreshButton = document.getElementById('refreshDashboardBtn');
  if (refreshButton) {
    refreshButton.addEventListener('click', () => {
      initDashboard();
    });
  }

  initDashboard();
});
