'use client';

const navItems = [
  { id: 'products', icon: '📦', label: 'Products' },
  { id: 'comments', icon: '💬', label: 'Comments' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-6">
        <div className="px-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
              }}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
