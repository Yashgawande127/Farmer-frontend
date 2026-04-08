import React from 'react';
import { 
    TrendingUp as ArrowUp, 
    TrendingDown as ArrowDown, 
    RefreshCw 
} from 'lucide-react';

const StatCards = ({ statCards }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`flex-shrink-0 ${stat.bgColor} rounded-xl p-3 transform group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div className={`flex items-center text-sm font-bold px-2 py-1 rounded-full ${
                                stat.changeType === 'increase' ? 'bg-green-50 text-green-600' :
                                stat.changeType === 'decrease' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'
                            }`}>
                                {stat.changeType === 'increase' && <ArrowUp className="h-4 w-4 mr-1" />}
                                {stat.changeType === 'decrease' && <ArrowDown className="h-4 w-4 mr-1" />}
                                {stat.changeType === 'stable' && <RefreshCw className="h-4 w-4 mr-1" />}
                                {stat.change}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.name}</p>
                                <div className="flex items-baseline space-x-2">
                                    <p className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 font-medium italic">{stat.subtitle}</p>
                            </div>

                            <div className="pt-2">
                                <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-semibold">
                                    <span>Achievement</span>
                                    <span>{stat.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                            stat.progress >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                            stat.progress >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                                            'bg-gradient-to-r from-red-400 to-red-600'
                                        }`}
                                        style={{ width: `${stat.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatCards;
