const menuItems = {
  items: [
    {
      id: 'admin-menu',
      title: '管理者メニュー',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'admin-home',
          title: '管理者ホーム',
          type: 'item',
          icon: 'feather icon-home',
          badge: {
            title: '',
            type: 'label-info feather icon-unlock rounded-pill'
          },
          url: '/dashboard'
        },
        {
          id: 'employee-management',
          title: '従業員管理',
          type: 'collapse',
          icon: 'feather icon-user',
          badge: {
            title: '',
            type: 'label-info feather icon-unlock rounded-pill'
          },
          url: '/employee',
          children: [
            {
              id: 'department',
              title: '部署',
              type: 'item',
              url: '/department'
            },
            {
              id: 'adddepartment',
              title: '部署追加',
              type: '',
              url: '/department/create'
            },
            {
              id: 'employee',
              title: '従業員',
              type: 'item',
              url: '/employee'
            },
            {
              id: 'addemployee',
              title: '従業員追加',
              type: '',
              url: '/employee/create'
            }
          ]
        },
        {
          id: 'leave-management',
          title: '休暇管理',
          type: 'collapse',
          icon: 'feather icon-flag',
          badge: {
            title: '',
            type: 'label-info feather icon-unlock rounded-pill'
          },
          url: '/dashboard',
          children: [
            {
              id: 'treat-single',
              title: '個別付与・消化',
              type: 'item',
              url: '/basic/treat-single'
            },
            {
              id: 'treat-multiple',
              title: '一斉付与・消化',
              type: 'item',
              url: '/treat_multiple'
            },
            {
              id: 'management-book',
              title: '年次有給休暇管理簿',
              type: 'item',
              url: '/basic/management-book'
            },
            {
              id: 'overall-history',
              title: '全体取得履歴',
              type: 'item',
              url: '/overall_history'
            },
            {
              id: 'obligation',
              title: '有休消化義務チェック',
              type: 'item',
              url: '/basic/obligation'
            },
            {
              id: 'used-day-book',
              title: '休暇取得記録表',
              type: 'item',
              url: '/basic/used-day-book'
            },
            {
              id: 'used-day-requests',
              title: '休暇申請の承認',
              type: 'item',
              url: '/approve'
            }
          ]
        },
        {
          id: 'vacation-settings',
          title: '休暇設定',
          type: 'collapse',
          icon: 'feather icon-settings',
          badge: {
            title: '',
            type: 'label-info feather icon-unlock rounded-pill'
          },
          url: '/dashboard',
          children: [
            {
              id: 'settings',
              title: '有休設定',
              type: 'item',
              url: '/settings'
            },
            {
              id: 'special-items',
              title: '特休設定',
              type: 'item',
              url: '/special_items'
            }
          ]
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'UI ELEMENT',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Component',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Button',
              type: 'item',
              url: '/basic/button'
            },
            {
              id: 'badges',
              title: 'Badges',
              type: 'item',
              url: '/basic/badges'
            },
            {
              id: 'breadcrumb',
              title: 'Breadcrumb',
              type: 'item',
              url: '/basic/breadcrumb'
            },
            {
              id: 'pagination',
              title: 'Pagination',
              type: 'item',
              url: '/basic/pagination'
            },
            {
              id: 'collapse',
              title: 'Collapse',
              type: 'item',
              url: '/basic/collapse'
            },
            {
              id: 'tabs-pills',
              title: 'Tabs & Pills',
              type: 'item',
              url: '/basic/tabs-pills'
            },
            {
              id: 'typography',
              title: 'Typography',
              type: 'item',
              url: '/basic/typography'
            }
          ]
        }
      ]
    },
    {
      id: 'ui-forms',
      title: 'FORMS & TABLES',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'forms',
          title: 'Form Elements',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/forms/form-basic'
        },
        {
          id: 'table',
          title: 'Table',
          type: 'item',
          icon: 'feather icon-server',
          url: '/tables/bootstrap'
        }
      ]
    },
    {
      id: 'chart-maps',
      title: 'Chart & Maps',
      type: 'group',
      icon: 'icon-charts',
      children: [
        {
          id: 'charts',
          title: 'Charts',
          type: 'item',
          icon: 'feather icon-pie-chart',
          url: '/charts/nvd3'
        },
        {
          id: 'maps',
          title: 'Maps',
          type: 'item',
          icon: 'feather icon-map',
          url: '/maps/google-map'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: 'feather icon-lock',
          badge: {
            title: 'New',
            type: 'label-danger'
          },
          children: [
            {
              id: 'signup-1',
              title: 'Sign up',
              type: 'item',
              url: '/auth/signup-1',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'signin-1',
              title: 'Sign in',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          url: '/sample-page',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'documentation',
          title: 'Documentation',
          type: 'item',
          icon: 'feather icon-book',
          classes: 'nav-item',
          url: 'https://codedthemes.gitbook.io/datta/',
          target: true,
          external: true
        },
        {
          id: 'menu-level',
          title: 'Menu Levels',
          type: 'collapse',
          icon: 'feather icon-menu',
          children: [
            {
              id: 'menu-level-1.1',
              title: 'Menu Level 1.1',
              type: 'item',
              url: '#!'
            },
            {
              id: 'menu-level-1.2',
              title: 'Menu Level 2.2',
              type: 'collapse',
              children: [
                {
                  id: 'menu-level-2.1',
                  title: 'Menu Level 2.1',
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'menu-level-2.2',
                  title: 'Menu Level 2.2',
                  type: 'collapse',
                  children: [
                    {
                      id: 'menu-level-3.1',
                      title: 'Menu Level 3.1',
                      type: 'item',
                      url: '#'
                    },
                    {
                      id: 'menu-level-3.2',
                      title: 'Menu Level 3.2',
                      type: 'item',
                      url: '#'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'disabled-menu',
          title: 'Disabled Menu',
          type: 'item',
          url: '#',
          classes: 'nav-item disabled',
          icon: 'feather icon-power'
        }
      ]
    }
  ]
};

export default menuItems;
