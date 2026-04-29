/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  Coins, 
  ReceiptText, 
  Search, 
  Upload, 
  ShieldAlert, 
  CheckCircle2, 
  Building2,
  FileSpreadsheet,
  PlusCircle,
  UserMinus,
  CalendarClock,
  History,
  Activity,
  LogOut,
  ShieldCheck,
  Key,
  Filter,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- MOCK DATA FOR DEMONSTRATION ---
const MOCK_EMPLOYEES = [
  { id: 'YG-2024001', name: '王建国', dept: '生产一厂', phone: '138****1234', points: 150, status: '正常' },
  { id: 'YG-2024002', name: '李明伟', dept: '生产一厂', phone: '139****5678', points: 45, status: '正常' },
  { id: 'YG-2024045', name: '张秀英', dept: '包装车间', phone: '137****9012', points: 0, status: '正常' },
  { id: 'YG-2024088', name: '赵铁柱', dept: '生产二厂', phone: '136****3456', points: 120, status: '已离职/封存' },
  { id: 'NO-EMP-001', name: '刘强 (外包)', dept: '后勤安保', phone: '158****7890', points: 50, status: '待审核' },
];

const MOCK_ORDERS = [
  { orderNo: 'ORD-20240801-001', empId: 'YG-2024001', empName: '王建国', dept: '生产一厂', item: '盐汽水 x 2', cost: 10, pos: '一厂小店', orderTime: '2024-08-01 12:20:00', verifyTime: '2024-08-01 12:30:15', status: '已核销' },
  { orderNo: 'ORD-20240801-002', empId: 'YG-2024002', empName: '李明伟', dept: '生产一厂', item: '冰镇脉动 x 1', cost: 15, pos: '一厂小店', orderTime: '2024-08-01 12:40:00', verifyTime: '2024-08-01 12:45:10', status: '已核销' },
  { orderNo: 'ORD-20240801-003', empId: 'YG-2024045', empName: '张秀英', dept: '包装车间', item: '高温防暑包', cost: 50, pos: '-', orderTime: '2024-08-01 14:15:00', verifyTime: '-', status: '待核销' },
  { orderNo: 'ORD-20240802-010', empId: 'YG-2024088', empName: '赵铁柱', dept: '生产二厂', item: '清凉油 x 5', cost: 25, pos: '二厂便利店', orderTime: '2024-08-02 09:10:00', verifyTime: '-', status: '已退款' },
  { orderNo: 'ORD-20240802-011', empId: 'NO-EMP-001', empName: '刘强 (外包)', dept: '后勤安保', item: '矿泉水一箱', cost: 40, pos: '南门集市', orderTime: '2024-08-02 10:05:00', verifyTime: '2024-08-02 10:06:20', status: '已核销' },
  { orderNo: 'ORD-20240803-015', empId: 'YG-2024001', empName: '王建国', dept: '生产一厂', item: '西瓜(半个)', cost: 20, pos: '-', orderTime: '2024-08-03 15:30:00', verifyTime: '-', status: '待核销' },
  { orderNo: 'ORD-20240803-022', empId: 'YG-2024002', empName: '李明伟', dept: '生产一厂', item: '冰棍 x 5', cost: 15, pos: '一厂小店', orderTime: '2024-08-03 16:00:00', verifyTime: '-', status: '已退款' },
];

const MOCK_POINT_LOGS = [
  { time: '2024-08-01 09:00', type: '批量发放', target: '全员 (300人)', amount: '+45,000', operator: '系统管理员' },
  { time: '2024-08-02 10:15', type: '单人补发', target: '李四 (新入职)', amount: '+150', operator: '系统管理员' },
  { time: '2024-08-15 14:30', type: '离职回收', target: '赵铁柱 (离职)', amount: '-120', operator: '系统管理员' },
  { time: '2024-07-31 23:59', type: '月底清零', target: '全体未使用员工', amount: '-800', operator: '系统自动' },
];

const MOCK_ADMINS = [
  { id: 'ADM-001', name: '系统超级管理员', role: '总管理员', dept: '全公司', phone: '13800000000', username: 'admin', password: '***', status: '正常' },
  { id: 'ADM-101', name: '张主管', role: '部门管理员', dept: '生产一厂', phone: '13911111111', username: 'zhang123', password: '***', status: '正常' },
  { id: 'ADM-102', name: '李经理', role: '部门管理员', dept: '生产二厂', phone: '13722222222', username: 'li123', password: '***', status: '正常' },
];

// Login Component
function LoginScreen({ onLogin }: { onLogin: (role: string) => void }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-200"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-200 mb-4">
            SY
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">阳光能源管理系统</h1>
          <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">高温补贴专版</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">用户名 / 账号</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-slate-800 font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">密码</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-slate-800 font-medium"
            />
          </div>
          <button 
            onClick={() => onLogin(username === 'admin' ? 'platform' : 'dept')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <Key size={18} /> 登录系统
          </button>
        </div>
        
        <div className="mt-6 text-center">
           <p className="text-[10px] text-slate-400">提示: 输入 admin 体验总管理员权限，其他账号为部门管理员</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('employees');
  const [role, setRole] = useState('platform'); // 'platform' or 'dept'

  const [admins, setAdmins] = useState(MOCK_ADMINS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingAdmin, setEditingAdmin] = useState<any>(null);

  const openAddModal = () => {
    setModalMode('add');
    setEditingAdmin({ id: `ADM-${Math.floor(100 + Math.random() * 900)}`, name: '', role: '部门管理员', dept: '', phone: '', username: '', password: '', status: '正常' });
    setIsModalOpen(true);
  };

  const openEditModal = (admin: any) => {
    setModalMode('edit');
    setEditingAdmin({ ...admin });
    setIsModalOpen(true);
  };

  const handleSaveAdmin = () => {
    if (modalMode === 'add') {
      setAdmins([...admins, editingAdmin]);
    } else {
      setAdmins(admins.map((a: any) => (a.id === editingAdmin.id ? editingAdmin : a)));
    }
    setIsModalOpen(false);
  };

  const NavItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon size={18} className={activeTab === id ? 'text-blue-100' : 'text-slate-400'} />
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </button>
  );

  const handleLogin = (userRole: string) => {
    setRole(userRole);
    setActiveTab('employees');
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
     return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* Sidebar - Represents the system's structure */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black shadow-md mr-3">
            SY
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 tracking-tight leading-tight text-sm">阳光能源管理系统</h1>
            <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">高温补贴专项</p>
          </div>
        </div>

        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 mb-2 px-4 mt-2">日常管理模块</div>
          <NavItem id="employees" icon={Users} label="员工名单管理" />
          <NavItem id="points" icon={Coins} label="积分管理" />
          <NavItem id="orders" icon={ReceiptText} label="消费明细" />
          
          {role === 'platform' && (
            <>
              <div className="text-[11px] font-bold text-slate-400 mb-2 px-4 mt-6">系统设置</div>
              <NavItem id="permissions" icon={ShieldCheck} label="权限配置" />
            </>
          )}
        </nav>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${role === 'platform' ? 'bg-slate-800' : 'bg-emerald-600'}`}>
                <Building2 size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {role === 'platform' ? '总管理员' : '部门管理员'}
                </p>
                <p className="text-[10px] text-slate-500">已登录</p>
              </div>
            </div>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors title='退出登录'"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {activeTab === 'employees' && '员工账号与状态'}
              {activeTab === 'points' && '积分发放与回收管理'}
              {activeTab === 'orders' && '员工小店消费明细'}
              {activeTab === 'permissions' && '权限与管理员配置'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
               <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${role === 'platform' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'}`}>
                 当前身份: {role === 'platform' ? '总管理员 (拥有全部权限)' : '部门管理员 (仅可管理本部门内容)'}
               </span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-400">目前暂无消息提示</span>
          </div>
        </header>

        {/* Content Views Container */}
        <div className="flex-1 p-8">
          
          {/* Admin Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200"
                >
                  <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                       <ShieldCheck size={18} className="text-indigo-500" />
                       {modalMode === 'add' ? '新增管理员' : '编辑系统管理员配置'}
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">管理员姓名</label>
                        <input 
                          type="text" 
                          value={editingAdmin?.name}
                          onChange={e => setEditingAdmin({...editingAdmin, name: e.target.value})}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          placeholder="姓名"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">联系手机号 (用作登录账号)</label>
                        <input 
                          type="tel" 
                          value={editingAdmin?.phone}
                          onChange={e => setEditingAdmin({...editingAdmin, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
                          placeholder="11位手机号"
                        />
                      </div>
                    </div>
                    
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">系统角色权限</label>
                        <select 
                          value={editingAdmin?.role}
                          onChange={e => setEditingAdmin({...editingAdmin, role: e.target.value, dept: e.target.value === '总管理员' ? '全公司' : editingAdmin.dept})}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                        >
                           <option value="部门管理员">部门管理员 (仅可管理本部人员，无发分权限)</option>
                           <option value="总管理员">总管理员 (拥有全部设置及发分审核等最高权限)</option>
                        </select>
                    </div>

                    {editingAdmin?.role === '部门管理员' && (
                       <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">管辖范围 (部门)</label>
                          <select 
                            value={editingAdmin?.dept}
                            onChange={e => setEditingAdmin({...editingAdmin, dept: e.target.value})}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                          >
                             <option value="" disabled>请选择管辖部门...</option>
                             <option value="生产一厂">生产一厂</option>
                             <option value="生产二厂">生产二厂</option>
                             <option value="包装车间">包装车间</option>
                             <option value="后勤安保">后勤安保</option>
                          </select>
                       </div>
                    )}
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">账号状态</label>
                        <div className="flex items-center gap-4 mt-2">
                           <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="status" 
                                value="正常" 
                                checked={editingAdmin?.status === '正常'}
                                onChange={e => setEditingAdmin({...editingAdmin, status: e.target.value})}
                                className="text-indigo-600 focus:ring-indigo-500" 
                              />
                              <span className="text-sm font-medium text-slate-700">正常使用</span>
                           </label>
                           <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="status" 
                                value="已停用" 
                                checked={editingAdmin?.status === '已停用'}
                                onChange={e => setEditingAdmin({...editingAdmin, status: e.target.value})}
                                className="text-indigo-600 focus:ring-indigo-500" 
                              />
                              <span className="text-sm font-medium text-slate-700">已停用 (禁止登录)</span>
                           </label>
                        </div>
                    </div>
                  </div>

                  <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                     <button 
                       onClick={() => setIsModalOpen(false)}
                       className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors"
                     >
                       取消
                     </button>
                     <button 
                       onClick={handleSaveAdmin}
                       className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
                     >
                       确认保存配置
                     </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">

            {/* 1. EMPLOYEES VIEW */}
            {activeTab === 'employees' && (
              <motion.div 
                key="employees"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]"
              >
                <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between bg-slate-50/50 gap-4">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="搜姓名或手机号" 
                        className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-white transition-all"
                      />
                    </div>
                    <select disabled={role !== 'platform'} className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 outline-none disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed">
                      <option>所有厂区/部门</option>
                      <option>生产一厂</option>
                      <option>生产二厂</option>
                      <option>包装车间</option>
                      <option>后勤安保</option>
                    </select>
                    <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-600 outline-none">
                      <option>所有可用状态</option>
                      <option>状态: 在职/正常</option>
                      <option>状态: 已离职/封存</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3">
                    {role === 'platform' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors">
                         <CheckCircle2 size={16} /> 审核新增员工
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 bg-blue-50 rounded-lg text-sm font-bold text-blue-700 hover:bg-blue-100 transition-colors shadow-sm">
                      <Upload size={16} /> 导入名单
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                      <FileSpreadsheet size={16} /> 导出名单
                    </button>
                  </div>
                </div>

                <div className="overflow-auto flex-1 p-0 m-0">
                  <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 last:border-0 w-[10%]">工号</th>
                        <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 last:border-0 w-[15%]">员工姓名</th>
                        <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 last:border-0 w-[15%]">所属部门</th>
                        <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 last:border-0 w-[15%]">登录手机号</th>
                        <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 last:border-0 w-[15%]">个人可用余额</th>
                        <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 last:border-0 w-[15%]">账号状态</th>
                        <th className="px-6 py-4 font-bold text-xs text-right w-[15%]">人员管理</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_EMPLOYEES.map((emp, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">{emp.id}</td>
                          <td className="px-6 py-4 font-bold text-slate-900">{emp.name}</td>
                          <td className="px-6 py-4 text-slate-600 text-xs">{emp.dept}</td>
                          <td className="px-6 py-4 font-mono text-xs text-slate-500">{emp.phone}</td>
                          <td className="px-6 py-4 font-black">
                             <span className={emp.points > 0 ? 'text-blue-600 text-base' : 'text-slate-400'}>{emp.points}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 inline-flex items-center gap-1 rounded text-[11px] font-bold border
                              ${emp.status === '正常' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                                emp.status === '待审核' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                                'bg-slate-50 text-slate-500 border-slate-200 line-through'}
                            `}>
                              {emp.status === '待审核' && <ShieldAlert size={10} />}
                              {emp.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button className="text-blue-600 font-bold hover:underline text-[12px]">资料修改</button>
                            {emp.status !== '已离职/封存' && (
                              <button className="text-rose-500 font-bold hover:underline text-[12px]">登记离职</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 2. POINTS MANAGEMENT VIEW */}
            {activeTab === 'points' && (
              <motion.div 
                key="points"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                {role === 'dept' ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                    <ShieldAlert className="text-amber-600 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold text-amber-800 text-base mb-1">管理员权限提示</h3>
                      <p className="text-sm text-amber-700 leading-relaxed max-w-2xl">
                        发分和回收需要<b>总平台管理员权限</b>。您当前为部门管理员账号，仅能查看发分动作与回收记录流水，若发现遗漏需要发分，请联系系统总管理员进行统一处理。
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    <button className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 shadow-sm transition-all hover:border-blue-300 hover:shadow-md group">
                       <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <PlusCircle size={24} />
                       </div>
                       <div className="text-center">
                         <h4 className="font-bold text-slate-800">批量按月发放</h4>
                         <p className="text-xs text-slate-400 mt-1">为所有正常员工发积分</p>
                       </div>
                    </button>
                    
                    <button className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 shadow-sm transition-all hover:border-blue-300 hover:shadow-md group">
                       <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Users size={24} />
                       </div>
                       <div className="text-center">
                         <h4 className="font-bold text-slate-800">给单人手动补发</h4>
                         <p className="text-xs text-slate-400 mt-1">发给新入职/被遗漏的人</p>
                       </div>
                    </button>

                    <button className="bg-white hover:bg-rose-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 shadow-sm transition-all hover:border-rose-300 hover:shadow-md group">
                       <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <UserMinus size={24} />
                       </div>
                       <div className="text-center">
                         <h4 className="font-bold text-rose-800">一键回收离职积分</h4>
                         <p className="text-xs text-slate-400 mt-1">防止离职员工兑换商品</p>
                       </div>
                    </button>
                    
                    <button className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md group">
                       <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CalendarClock size={24} />
                       </div>
                       <div className="text-center">
                         <h4 className="font-bold text-slate-800">延长没用完的积分</h4>
                         <p className="text-xs text-slate-400 mt-1">让月底没用完的积分继续用</p>
                       </div>
                    </button>
                  </div>
                )}

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex-1 min-h-[300px]">
                   <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <History size={18} className="text-blue-500" />
                          积分发扣操作留痕
                       </h3>
                       <span className="text-xs text-slate-400 border border-slate-200 px-3 py-1 rounded-full bg-slate-50 hidden sm:block">每发一次、清零一次，都有时间地点可追溯</span>
                     </div>
                     <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                       <FileSpreadsheet size={16} /> 导出报表
                     </button>
                   </div>
                   <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          <th className="px-6 py-4 font-bold text-xs w-[20%]">执行时间</th>
                          <th className="px-6 py-4 font-bold text-xs w-[15%]">动作名目</th>
                          <th className="px-6 py-4 font-bold text-xs w-[25%]">收发对象</th>
                          <th className="px-6 py-4 font-bold text-xs w-[15%]">增加/减少记录</th>
                          <th className="px-6 py-4 font-bold text-xs w-[25%]">执行账号或系统员</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {MOCK_POINT_LOGS.map((log, idx) => (
                           <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 text-slate-500 font-mono text-xs">{log.time}</td>
                              <td className="px-6 py-4 font-bold flex items-center gap-1.5 mt-1">
                                 <span className={`w-2 h-2 rounded-full ${
                                    log.type.includes('发放') || log.type.includes('补发') ? 'bg-blue-500' :
                                    log.type.includes('回收') ? 'bg-rose-500' : 'bg-slate-400'
                                 }`}></span>
                                 <span className={`text-slate-800`}>
                                    {log.type}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-slate-700">{log.target}</td>
                              <td className="px-6 py-4 font-black">
                                 <span className={log.amount.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}>
                                   {log.amount}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-slate-500 text-xs flex items-center gap-2">
                                {log.operator === '系统自动' ? <Activity size={14} className="text-slate-400" /> : <Users size={14} className="text-blue-400" />}
                                {log.operator}
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              </motion.div>
            )}

            {/* 3. ORDERS VIEW */}
            {activeTab === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col items-stretch max-h-[calc(100vh-140px)]"
              >
                <div className="p-5 border-b border-slate-200 bg-slate-50 text-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                     <h3 className="font-bold flex items-center gap-2 text-base">
                       <Filter size={18} className="text-blue-500" />
                       订单记录全维查询
                     </h3>
                     <p className="text-xs text-slate-500">展示微商城所有下单记录，包括待核销、已核销及退款记录。</p>
                  </div>
                  
                  {/* Advanced Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                     <div className="flex flex-col gap-1.5">
                       <label className="text-[10px] font-bold text-slate-400 uppercase">部门 / 厂区</label>
                       <select className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm outline-none focus:border-blue-400">
                          <option>全部厂区</option>
                          <option>生产一厂</option>
                          <option>生产二厂</option>
                       </select>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <label className="text-[10px] font-bold text-slate-400 uppercase">订单状态</label>
                       <select className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm outline-none focus:border-blue-400">
                          <option>所有状态</option>
                          <option>待核销 (已下单)</option>
                          <option>已核销</option>
                          <option>已退款</option>
                       </select>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <label className="text-[10px] font-bold text-slate-400 uppercase">订单号</label>
                       <input type="text" placeholder="输入订单号..." className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm outline-none focus:border-blue-400" />
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <label className="text-[10px] font-bold text-slate-400 uppercase">工号 / 姓名</label>
                       <input type="text" placeholder="员工姓名或工号..." className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm outline-none focus:border-blue-400" />
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <label className="text-[10px] font-bold text-slate-400 uppercase">核销门店</label>
                       <input type="text" placeholder="门店名称..." className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm outline-none focus:border-blue-400" />
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <label className="text-[10px] font-bold text-slate-400 uppercase">下单时间段</label>
                       <input type="date" className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm outline-none focus:border-blue-400" />
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <label className="text-[10px] font-bold text-slate-400 uppercase">核销时间段</label>
                       <input type="date" className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm outline-none focus:border-blue-400" />
                     </div>
                     <div className="flex items-end h-full gap-2">
                       <button className="h-[38px] px-4 flex-1 bg-blue-600 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-blue-700 transition-colors">
                         <Search size={16} /> 查询筛选
                       </button>
                       <button className="h-[38px] px-4 flex-1 bg-slate-900 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-slate-800 transition-colors">
                         <FileSpreadsheet size={16} /> 导出报表
                       </button>
                     </div>
                  </div>
                </div>

                <div className="overflow-auto flex-1 bg-white">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 sticky top-0 z-10">
                      <tr>
                        <th className="px-5 py-4 font-bold text-xs uppercase w-[15%]">验证订单编号</th>
                        <th className="px-5 py-4 font-bold text-xs uppercase w-[15%]">买主及部门</th>
                        <th className="px-5 py-4 font-bold text-xs uppercase w-[15%]">消费名目</th>
                        <th className="px-5 py-4 font-bold text-xs uppercase w-[8%]">变动积分</th>
                        <th className="px-5 py-4 font-bold text-xs uppercase w-[12%]">提货地点 / 店面</th>
                        <th className="px-5 py-4 font-bold text-xs uppercase w-[12%]">下单时间</th>
                        <th className="px-5 py-4 font-bold text-xs uppercase w-[12%]">核销时间</th>
                        <th className="px-5 py-4 font-bold text-xs uppercase text-center w-[11%]">订单状态</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {MOCK_ORDERS.map((order, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 font-mono font-medium text-slate-400 text-[11px]">{order.orderNo}</td>
                          <td className="px-5 py-4 leading-relaxed">
                            <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                               {order.empName}
                               <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{order.empId}</span>
                            </div>
                            <div className="text-[11px] text-slate-500">{order.dept}</div>
                          </td>
                          <td className="px-5 py-4 font-bold text-slate-700">
                            {order.item}
                          </td>
                          <td className="px-5 py-4 font-black">
                             <span className={`${order.status === '已退款' ? 'text-slate-400' : 'text-rose-500'} px-2 py-0.5 bg-slate-50 rounded border border-slate-100 text-xs`}>
                               {order.status === '已退款' ? `+${order.cost}` : `-${order.cost}`}
                             </span>
                          </td>
                          <td className="px-5 py-4 text-xs font-bold text-slate-500">
                             {order.pos}
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-500 font-mono">
                             {order.orderTime}
                          </td>
                          <td className="px-5 py-4 text-[11px] text-slate-400 font-mono">
                             {order.verifyTime}
                          </td>
                          <td className="px-5 py-4 text-center">
                             <span className={`inline-flex px-2 py-1 text-[11px] font-black rounded border
                               ${order.status === '已核销' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                 order.status === '待核销' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                 'bg-slate-50 text-slate-500 border-slate-200'}
                             `}>
                               {order.status}
                             </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 4. PERMISSIONS VIEW (New) */}
            {activeTab === 'permissions' && (
              <motion.div 
                 key="permissions"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]"
              >
                 <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <h3 className="font-bold flex items-center gap-2 text-slate-800 text-base">
                        <ShieldCheck size={18} className="text-indigo-500" /> 
                        系统管理员与权限配置
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">负责系统运维或各厂区人员的管理人员均需在此登记及授权，保证系统安全。</p>
                    </div>
                    {role === 'platform' && (
                      <button 
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors"
                      >
                         <PlusCircle size={16} /> 新增管理员
                      </button>
                    )}
                 </div>

                 {role === 'dept' && (
                    <div className="mx-5 mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-4">
                       <ShieldAlert className="text-amber-600 shrink-0" size={20} />
                       <div className="text-sm text-amber-700 leading-relaxed font-medium">
                         您当前为部门管理员账号，仅能查看管理员名单，不能进行新增或修改配置的操作。
                       </div>
                    </div>
                 )}

                 <div className="overflow-auto flex-1 p-0 m-5 border-t border-slate-100">
                   <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
                     <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 sticky top-0 z-10 shadow-sm">
                       <tr>
                         <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 w-[15%]">管理号</th>
                         <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 w-[15%]">管理员姓名</th>
                         <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 w-[15%]">系统角色</th>
                         <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 w-[15%]">管辖范围 (部门)</th>
                         <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 w-[15%]">联系手机号</th>
                         <th className="px-6 py-4 font-bold text-xs border-r border-slate-100 w-[10%]">状态</th>
                         <th className="px-6 py-4 font-bold text-xs text-right w-[15%]">操作</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                       {admins.map((admin, i) => (
                         <tr key={i} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">{admin.id}</td>
                           <td className="px-6 py-4 font-bold text-slate-900">{admin.name}</td>
                           <td className="px-6 py-4">
                             <span className={`px-2 py-0.5 rounded text-xs font-bold ${admin.role === '总管理员' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-50 text-blue-600'}`}>
                               {admin.role}
                             </span>
                           </td>
                           <td className="px-6 py-4 text-slate-600 font-medium text-xs">{admin.dept}</td>
                           <td className="px-6 py-4 font-mono text-xs text-slate-500">{admin.phone}</td>
                           <td className="px-6 py-4">
                             <span className={`${admin.status === '正常' ? 'text-emerald-600' : 'text-slate-400'} font-bold text-xs flex items-center gap-1`}>
                               {admin.status === '正常' ? <CheckCircle2 size={14} /> : <ShieldAlert size={14} />} {admin.status}
                             </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                             {role === 'platform' ? (
                               <button 
                                 onClick={() => openEditModal(admin)}
                                 className="text-indigo-600 font-bold hover:underline text-[12px]"
                               >编辑配置</button>
                             ) : (
                               <span className="text-slate-300 text-xs">-</span>
                             )}
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
