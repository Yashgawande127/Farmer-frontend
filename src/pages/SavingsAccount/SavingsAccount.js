import React, { useState } from 'react';
import {
    Wallet,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Plus,
    Minus,
    Calendar,
    Filter,
    Download,
    Eye,
    CreditCard,
    Banknote,
    Target,
    PiggyBank
} from 'lucide-react';

const SavingsAccount = () => {
    const [activeTab, setActiveTab] = useState('overview'); // overview, transactions, goals
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [filterPeriod, setFilterPeriod] = useState('all');

    const [accountData] = useState({
        balance: 145000,
        totalDeposits: 250000,
        totalWithdrawals: 105000,
        interestEarned: 12500,
        accountNumber: 'FRM******4567',
        interestRate: 4.5,
        lastUpdated: '2024-01-15T10:30:00'
    });

    const [transactions, setTransactions] = useState([
        {
            id: 1,
            type: 'deposit',
            amount: 15000,
            description: 'Wheat harvest sale',
            date: '2024-01-15',
            category: 'farming_income',
            balance: 145000
        },
        {
            id: 2,
            type: 'withdrawal',
            amount: 8000,
            description: 'Seeds purchase payment',
            date: '2024-01-14',
            category: 'farming_expense',
            balance: 130000
        },
        {
            id: 3,
            type: 'deposit',
            amount: 5000,
            description: 'Vegetable sale',
            date: '2024-01-12',
            category: 'farming_income',
            balance: 138000
        },
        {
            id: 4,
            type: 'withdrawal',
            amount: 3000,
            description: 'Tractor rent payment',
            date: '2024-01-10',
            category: 'machinery_expense',
            balance: 133000
        },
        {
            id: 5,
            type: 'deposit',
            amount: 20000,
            description: 'Rice crop sale',
            date: '2024-01-08',
            category: 'farming_income',
            balance: 136000
        },
        {
            id: 6,
            type: 'interest',
            amount: 1500,
            description: 'Monthly interest credit',
            date: '2024-01-01',
            category: 'interest',
            balance: 116000
        }
    ]);

    const [savingsGoals, setSavingsGoals] = useState([
        {
            id: 1,
            title: 'New Tractor Purchase',
            targetAmount: 500000,
            currentAmount: 245000,
            deadline: '2024-12-31',
            description: 'Save for a new John Deere tractor',
            priority: 'high'
        },
        {
            id: 2,
            title: 'Irrigation System',
            targetAmount: 200000,
            currentAmount: 75000,
            deadline: '2024-08-31',
            description: 'Drip irrigation system for better water management',
            priority: 'medium'
        },
        {
            id: 3,
            title: 'Emergency Fund',
            targetAmount: 100000,
            currentAmount: 85000,
            deadline: '2024-06-30',
            description: 'Emergency fund for unexpected expenses',
            priority: 'high'
        }
    ]);

    const [newGoal, setNewGoal] = useState({
        title: '',
        targetAmount: '',
        deadline: '',
        description: '',
        priority: 'medium'
    });

    const periods = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' }
    ];

    const categories = [
        { value: 'farming_income', label: 'Farming Income', color: 'text-green-600' },
        { value: 'farming_expense', label: 'Farming Expense', color: 'text-red-600' },
        { value: 'machinery_expense', label: 'Machinery Expense', color: 'text-blue-600' },
        { value: 'interest', label: 'Interest', color: 'text-purple-600' },
        { value: 'other', label: 'Other', color: 'text-gray-600' }
    ];

    const handleDeposit = (e) => {
        e.preventDefault();
        const amount = parseFloat(e.target.amount.value);
        const description = e.target.description.value;
        const category = e.target.category.value;

        const newTransaction = {
            id: Date.now(),
            type: 'deposit',
            amount,
            description,
            date: new Date().toISOString().split('T')[0],
            category,
            balance: accountData.balance + amount
        };

        setTransactions([newTransaction, ...transactions]);
        accountData.balance += amount;
        setShowDepositModal(false);
    };

    const handleWithdraw = (e) => {
        e.preventDefault();
        const amount = parseFloat(e.target.amount.value);
        const description = e.target.description.value;
        const category = e.target.category.value;

        if (amount > accountData.balance) {
            alert('Insufficient balance');
            return;
        }

        const newTransaction = {
            id: Date.now(),
            type: 'withdrawal',
            amount,
            description,
            date: new Date().toISOString().split('T')[0],
            category,
            balance: accountData.balance - amount
        };

        setTransactions([newTransaction, ...transactions]);
        accountData.balance -= amount;
        setShowWithdrawModal(false);
    };

    const handleAddGoal = (e) => {
        e.preventDefault();
        const goal = {
            id: Date.now(),
            ...newGoal,
            targetAmount: parseFloat(newGoal.targetAmount),
            currentAmount: 0
        };

        setSavingsGoals([...savingsGoals, goal]);
        setNewGoal({
            title: '',
            targetAmount: '',
            deadline: '',
            description: '',
            priority: 'medium'
        });
        setShowGoalModal(false);
    };

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'deposit':
                return <TrendingUp className="h-4 w-4 text-green-600" />;
            case 'withdrawal':
                return <TrendingDown className="h-4 w-4 text-red-600" />;
            case 'interest':
                return <DollarSign className="h-4 w-4 text-purple-600" />;
            default:
                return <DollarSign className="h-4 w-4 text-gray-600" />;
        }
    };

    const getCategoryLabel = (category) => {
        const cat = categories.find(c => c.value === category);
        return cat ? cat.label : 'Other';
    };

    const getCategoryColor = (category) => {
        const cat = categories.find(c => c.value === category);
        return cat ? cat.color : 'text-gray-600';
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getProgressPercentage = (current, target) => {
        return Math.min((current / target) * 100, 100);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Savings Account</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Manage your farm savings and track financial goals</p>
                </div>
                <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
                    <button
                        onClick={() => setShowDepositModal(true)}
                        className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:py-2.5 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95"
                    >
                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm font-semibold text-white">Deposit</span>
                    </button>
                    <button
                        onClick={() => setShowWithdrawModal(true)}
                        className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:py-2.5 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95"
                    >
                        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm font-semibold text-white">Withdraw</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 overflow-x-auto no-scrollbar">
                <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max pb-1">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-2 px-1 border-b-2 font-bold text-sm transition-all ${activeTab === 'overview'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`py-2 px-1 border-b-2 font-bold text-sm transition-all ${activeTab === 'transactions'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Transactions
                    </button>
                    <button
                        onClick={() => setActiveTab('goals')}
                        className={`py-2 px-1 border-b-2 font-bold text-sm transition-all ${activeTab === 'goals'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Savings Goals
                    </button>
                </nav>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Account Summary */}
                    <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-32 -translate-y-32"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 translate-y-16"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                                <div className="flex items-center">
                                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm mr-4">
                                        <Wallet className="h-6 w-6 sm:h-8 sm:w-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold">Farm Savings</h2>
                                        <p className="text-green-100 text-xs sm:text-sm font-medium tracking-widest">{accountData.accountNumber}</p>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right bg-white/10 p-3 rounded-xl backdrop-blur-sm w-fit">
                                    <p className="text-green-100 text-[10px] uppercase font-bold tracking-widest">Interest Rate</p>
                                    <p className="text-xl sm:text-2xl font-black">{accountData.interestRate}% <span className="text-xs font-normal opacity-80 underline underline-offset-4 cursor-help">P.A.</span></p>
                                </div>
                            </div>
                            <div className="border-t border-white/20 pt-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <p className="text-green-100 text-xs sm:text-sm font-medium mb-1">Current Account Balance</p>
                                        <p className="text-3xl sm:text-4xl font-black tracking-tight">₹{accountData.balance.toLocaleString()}</p>
                                    </div>
                                    <div className="text-left sm:text-right w-full sm:w-auto">
                                        <p className="text-green-100 text-[10px] uppercase font-bold tracking-widest">Last Updated</p>
                                        <p className="text-xs font-medium opacity-90">{new Date(accountData.lastUpdated).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <TrendingUp className="h-8 w-8 text-green-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Deposits</p>
                                    <p className="text-2xl font-bold text-gray-900">₹{accountData.totalDeposits.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <TrendingDown className="h-8 w-8 text-red-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Withdrawals</p>
                                    <p className="text-2xl font-bold text-gray-900">₹{accountData.totalWithdrawals.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <DollarSign className="h-8 w-8 text-purple-500" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Interest Earned</p>
                                    <p className="text-2xl font-bold text-gray-900">₹{accountData.interestEarned.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                            <button
                                onClick={() => setActiveTab('transactions')}
                                className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-3">
                            {transactions.slice(0, 5).map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 border border-gray-100 rounded-2xl group hover:bg-white hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 sm:p-2.5 rounded-xl bg-white shadow-sm transition-transform group-hover:scale-110">
                                            {getTransactionIcon(transaction.type)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 leading-tight">{transaction.description}</p>
                                            <p className="text-[10px] sm:text-xs font-medium text-gray-500 mt-0.5">
                                                {new Date(transaction.date).toLocaleDateString()} • {getCategoryLabel(transaction.category)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right ml-2">
                                        <p className={`text-sm sm:text-base font-black ${transaction.type === 'deposit' || transaction.type === 'interest'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                            }`}>
                                            {transaction.type === 'deposit' || transaction.type === 'interest' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                        </p>
                                        <p className="text-[10px] sm:text-xs font-bold text-gray-400">Bal: ₹{transaction.balance.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
                <div className="space-y-6">
                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 text-white">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-400" />
                                <select
                                    className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                                    value={filterPeriod}
                                    onChange={(e) => setFilterPeriod(e.target.value)}
                                >
                                    {periods.map(period => (
                                        <option key={period.value} value={period.value}>
                                            {period.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className="w-full sm:w-auto bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-xl border border-green-100 flex items-center justify-center font-bold text-sm transition-all active:scale-95">
                                <Download className="h-4 w-4 mr-2" />
                                Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Transactions Table - Responsive card list on mobile, table on desktop */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="block md:hidden divide-y divide-gray-100">
                            {transactions.map((transaction) => (
                                <div key={transaction.id} className="p-4 flex flex-col gap-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-50 rounded-lg">
                                                {getTransactionIcon(transaction.type)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 leading-tight">{transaction.description}</p>
                                                <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()} • {getCategoryLabel(transaction.category)}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-sm font-black ${transaction.type === 'deposit' || transaction.type === 'interest' ? 'text-green-600' : 'text-red-600'}`}>
                                                {transaction.type === 'deposit' || transaction.type === 'interest' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                            </p>
                                            <p className="text-[10px] font-bold text-gray-400">Bal: ₹{transaction.balance.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Date</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Description</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Category</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Type</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Amount</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{new Date(transaction.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    {getTransactionIcon(transaction.type)}
                                                    <span className="text-sm font-bold text-gray-900">{transaction.description}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-xs font-bold ${getCategoryColor(transaction.category)}`}>{getCategoryLabel(transaction.category)}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 text-[10px] font-black rounded-full uppercase tracking-tighter ${transaction.type === 'deposit' || transaction.type === 'interest' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {transaction.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-right pr-12">
                                                <span className={transaction.type === 'deposit' || transaction.type === 'interest' ? 'text-green-600' : 'text-red-600'}>
                                                    {transaction.type === 'deposit' || transaction.type === 'interest' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">₹{transaction.balance.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Savings Goals Tab */}
            {activeTab === 'goals' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">Savings Goals</h2>
                        <button
                            onClick={() => setShowGoalModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                        >
                            <Target className="h-5 w-5" />
                            <span>Add Goal</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {savingsGoals.map((goal) => (
                            <div key={goal.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full translate-x-16 -translate-y-16 group-hover:bg-green-100 transition-colors"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-green-50 rounded-xl">
                                                <Target className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-gray-900 leading-tight">{goal.title}</h3>
                                                <p className="text-xs font-semibold text-gray-500 mt-0.5">{goal.description}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${getPriorityColor(goal.priority)}`}>
                                            {goal.priority}
                                        </span>
                                    </div>

                                    <div className="mb-6 space-y-2">
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Saved Amount</p>
                                                <p className="text-2xl font-black text-green-600">₹{goal.currentAmount.toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black text-gray-900">{getProgressPercentage(goal.currentAmount, goal.targetAmount).toFixed(0)}%</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</p>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3 p-1 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${getProgressPercentage(goal.currentAmount, goal.targetAmount)}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-50">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target</p>
                                            <p className="text-sm font-bold text-gray-900">₹{goal.targetAmount.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Left</p>
                                            <p className="text-sm font-bold text-red-600">₹{(goal.targetAmount - goal.currentAmount).toLocaleString()}</p>
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deadline</p>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3 text-gray-400" />
                                                <p className="text-sm font-bold text-gray-900">{new Date(goal.deadline).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Deposit Modal */}
            {showDepositModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Deposit Money</h3>
                        <form onSubmit={handleDeposit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    required
                                    min="1"
                                    step="0.01"
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">Select category</option>
                                    <option value="farming_income">Farming Income</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowDepositModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Deposit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Withdraw Money</h3>
                        <div className="mb-4 p-3 bg-blue-50 rounded-md">
                            <p className="text-sm text-blue-800">Available Balance: ₹{accountData.balance.toLocaleString()}</p>
                        </div>
                        <form onSubmit={handleWithdraw} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    required
                                    min="1"
                                    max={accountData.balance}
                                    step="0.01"
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">Select category</option>
                                    <option value="farming_expense">Farming Expense</option>
                                    <option value="machinery_expense">Machinery Expense</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowWithdrawModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Withdraw
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Goal Modal */}
            {showGoalModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Create Savings Goal</h3>
                        <form onSubmit={handleAddGoal} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Goal Title</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    value={newGoal.title}
                                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                                    placeholder="e.g., New Tractor"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Target Amount</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    value={newGoal.targetAmount}
                                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                                    placeholder="Enter target amount"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Target Date</label>
                                <input
                                    type="date"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    value={newGoal.deadline}
                                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <select
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    value={newGoal.priority}
                                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    rows="3"
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    value={newGoal.description}
                                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                                    placeholder="Describe your goal"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowGoalModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Create Goal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavingsAccount;