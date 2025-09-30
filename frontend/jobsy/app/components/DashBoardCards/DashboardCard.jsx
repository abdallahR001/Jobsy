import { TrendingUp } from "lucide-react";

export default function DashBoardCard({icon, title, value, color, trend})
{
    const colorConfig = {
        blue: {
            gradient: "from-blue-500 to-cyan-500",
            bg: "from-blue-50 to-cyan-50",
            text: "text-blue-600",
            border: "border-blue-200"
        },
        indigo: {
            gradient: "from-indigo-500 to-purple-500",
            bg: "from-indigo-50 to-purple-50",
            text: "text-indigo-600",
            border: "border-indigo-200"
        },
        yellow: {
            gradient: "from-yellow-500 to-orange-500",
            bg: "from-yellow-50 to-orange-50",
            text: "text-yellow-600",
            border: "border-yellow-200"
        },
        green: {
            gradient: "from-green-500 to-emerald-500",
            bg: "from-green-50 to-emerald-50",
            text: "text-green-600",
            border: "border-green-200"
        },
    }

    const config = colorConfig[color] || colorConfig.indigo

    return(
        <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            <div className="relative z-10 p-6">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                            {title}
                        </p>
                        <p className="text-4xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
                            {value}
                        </p>
                    </div>
                    
                    {/* Icon with gradient background */}
                    <div className={`w-14 h-14 bg-gradient-to-r ${config.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <div className="text-white">
                            {icon}
                        </div>
                    </div>
                </div>

                {/* Trend indicator */}
                {trend && (
                    <div className={`flex items-center gap-2 mt-4 pt-4 border-t ${config.border}`}>
                        <TrendingUp className={`w-4 h-4 ${config.text}`} />
                        <span className={`text-sm font-medium ${config.text}`}>
                            {trend}
                        </span>
                    </div>
                )}

                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${config.gradient} rounded-b-3xl`}></div>
            </div>

            {/* Decorative elements */}
            <div className={`absolute top-2 right-2 w-3 h-3 bg-gradient-to-r ${config.gradient} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500`}></div>
            <div className={`absolute bottom-2 left-2 w-2 h-2 bg-gradient-to-r ${config.gradient} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700`}></div>
        </div>
    )
}