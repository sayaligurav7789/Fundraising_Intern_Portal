import { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Home, BarChart3, Gift, User, Copy, DollarSign, Trophy, Star, Target, Award, Menu, X, ChevronDown, Search, Bell, TrendingUp, Users, Calendar, Zap, Siren as Fire, Crown, Medal } from 'lucide-react';
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Static data that will be merged with Firestore data
  const staticInternData = {
    email: "sayali@fundnest.com",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    target: 25000,
    rank: 3,
    donorsCount: 127,
    monthlyGrowth: 18.5
  };

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userDocRef = doc(db, "users", "sayali123");
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const firestoreData = userDoc.data();
          // Merge Firestore data with static data
          setUserData({
            ...staticInternData,
            name: firestoreData.name || "Sayali Gurav",
            referralCode: firestoreData.referralCode || "sayali2025",
            totalDonations: firestoreData.amountRaised || 0
          });
        } else {
          console.log("No user document found!");
          // Fallback to default values if document doesn't exist
          setUserData({
            ...staticInternData,
            name: "Sayali Gurav",
            referralCode: "sayali2025",
            totalDonations: 0
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to default values on error
        setUserData({
          ...staticInternData,
          name: "Sayali Gurav",
          referralCode: "sayali2025",
          totalDonations: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Use userData instead of static internData
  const internData = userData;

  //handle signOut
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/signin"; // or use navigate if using react-router
    } catch (error) {
      // Optionally handle error
      console.error("Sign out error:", error);
    }
  };

  // Leaderboard data (updated to use dynamic data for current user)
  const leaderboard = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      amount: 28450,
      donors: 156,
      badge: "🏆",
      rank: 1,
      growth: "+24%"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      amount: 22180,
      donors: 143,
      badge: "🥈",
      rank: 2,
      growth: "+19%"
    },
    {
      id: 3,
      name: internData.name,
      avatar: internData.avatar,
      amount: internData.totalDonations,
      donors: internData.donorsCount,
      badge: "🥉",
      rank: 3,
      growth: `+${internData.monthlyGrowth}%`,
      isCurrentUser: true
    },
    {
      id: 4,
      name: "David Park",
      avatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      amount: 14890,
      donors: 98,
      badge: "⭐",
      rank: 4,
      growth: "+15%"
    },
    {
      id: 5,
      name: "Emma Johnson",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      amount: 13250,
      donors: 89,
      badge: "💎",
      rank: 5,
      growth: "+12%"
    }
  ];

  // Notifications data
  const notifications = [
    {
      id: 1,
      title: "New Donation Received! 🎉",
      message: "John Smith donated $250",
      time: "2 minutes ago",
      type: "success",
      unread: true
    },
    {
      id: 2,
      title: "Milestone Achievement 🏆",
      message: "You've reached 60% of your goal!",
      time: "1 hour ago",
      type: "achievement",
      unread: true
    },
    {
      id: 3,
      title: "Leaderboard Update 📈",
      message: "You moved up to 3rd place!",
      time: "3 hours ago",
      type: "info",
      unread: false
    },
    {
      id: 4,
      title: "New Reward Unlocked 🎁",
      message: "Silver Champion badge earned",
      time: "1 day ago",
      type: "reward",
      unread: false
    }
  ];

  const rewards = [
    {
      id: 1,
      title: "Bronze Fundraiser",
      description: "Raise $5,000",
      amount: 5000,
      unlocked: internData.totalDonations >= 5000,
      icon: Award
    },
    {
      id: 2,
      title: "Silver Champion",
      description: "Raise $15,000",
      amount: 15000,
      unlocked: internData.totalDonations >= 15000,
      icon: Trophy
    },
    {
      id: 3,
      title: "Gold Master",
      description: "Raise $25,000",
      amount: 25000,
      unlocked: internData.totalDonations >= 25000,
      icon: Star
    },
    {
      id: 4,
      title: "Platinum Elite",
      description: "Raise $50,000",
      amount: 50000,
      unlocked: internData.totalDonations >= 50000,
      icon: Target
    }
  ];

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'rewards', label: 'Rewards', icon: Gift }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(internData.referralCode);
    // You could add a toast notification here
  };

  const progressPercentage = (internData.totalDonations / internData.target) * 100;
  const unreadNotifications = notifications.filter(n => n.unread).length;

  const getRankEmoji = (rank) => {
    switch(rank) {
      case 1: return "🏆";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return "⭐";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-green-900/30 rounded-2xl p-8 lg:p-12">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  {/* Funding SVG Illustration */}
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Background Circle */}
                      <circle cx="100" cy="100" r="90" fill="none" stroke="url(#gradient1)" strokeWidth="4" opacity="0.3"/>
                      
                      {/* Money Stack */}
                      <rect x="70" y="80" width="60" height="8" rx="4" fill="#10B981" opacity="0.9"/>
                      <rect x="70" y="88" width="60" height="8" rx="4" fill="#059669" opacity="0.8"/>
                      <rect x="70" y="96" width="60" height="8" rx="4" fill="#047857" opacity="0.7"/>
                      
                      {/* Growth Arrow */}
                      <path d="M140 70 L160 50 L155 55 L170 40 L175 45 L160 60 L165 55 L145 75 Z" fill="#3B82F6"/>
                      
                      {/* Coins */}
                      <circle cx="60" cy="60" r="12" fill="#F59E0B" opacity="0.8"/>
                      <circle cx="60" cy="60" r="8" fill="#D97706" opacity="0.9"/>
                      <text x="60" y="65" textAnchor="middle" className="text-xs font-bold" fill="white">$</text>
                      
                      <circle cx="140" cy="130" r="10" fill="#F59E0B" opacity="0.7"/>
                      <circle cx="140" cy="130" r="6" fill="#D97706" opacity="0.8"/>
                      <text x="140" y="134" textAnchor="middle" className="text-xs font-bold" fill="white">$</text>
                      
                      {/* Heart for impact */}
                      <path d="M50 120 C50 115, 45 110, 40 110 C35 110, 30 115, 30 120 C30 130, 50 145, 50 145 C50 145, 70 130, 70 120 C70 115, 65 110, 60 110 C55 110, 50 115, 50 120 Z" fill="#EF4444" opacity="0.8"/>
                      
                      {/* Gradient Definitions */}
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.8"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Welcome to <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">FundNest</span>
                </h2>
                <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                  Your fundraising journey starts here. Track your progress, earn rewards, and make a difference in the world.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Share Referral Card */}
              <div className="h-full">
                <div className="bg-gradient-to-br from-orange-900/30 to-red-900/20 p-8 rounded-xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 group cursor-pointer h-full min-h-[300px] flex flex-col justify-between">
                  {/* Full Image */}
                  <DotLottieReact
                    src="https://lottie.host/1e80e9f1-31b2-4c40-8ce5-e536bd917198/qPPUswAexR.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>

              <div className="h-full">
                <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/20 p-0 rounded-xl border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 group cursor-pointer h-full min-h-[300px] overflow-hidden relative">
                  {/* Full Image */}
                  <DotLottieReact
                    src="https://lottie.host/8818b47e-2dde-4952-8c2a-0f941fa086ef/CoAm5jy7LI.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>
            </div>

            {/* Impact Section */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/20 p-8 rounded-xl border border-emerald-500/20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Making an Impact</h3>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Every dollar you raise creates real change. Your efforts are helping build a better future for communities around the world.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'rewards':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">🏆 Rewards & Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rewards.map((reward) => {
                const IconComponent = reward.icon;
                return (
                  <div
                    key={reward.id}
                    className={`p-6 rounded-xl border transition-all duration-200 ${
                      reward.unlocked
                        ? 'bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-500/30'
                        : 'bg-gray-800/50 border-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-full ${
                          reward.unlocked
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-700/50 text-gray-500'
                        }`}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            reward.unlocked ? 'text-green-400' : 'text-gray-400'
                          }`}
                        >
                          {reward.title}
                        </h3>
                        <p className="text-gray-300 text-sm">{reward.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          ${reward.amount.toLocaleString()}
                        </p>
                      </div>
                      {reward.unlocked && (
                        <div className="text-green-400">
                          <Award size={20} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      default: // dashboard
        return (
          <div className="space-y-6">
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Your Rank Card */}
              <div className="bg-gradient-to-br from-yellow-900/50 to-amber-900/30 p-6 rounded-xl border border-yellow-500/20 text-center">
                <div className="bg-yellow-500/20 p-3 rounded-full w-fit mx-auto mb-3">
                  <span className="text-2xl">{getRankEmoji(internData.rank)}</span>
                </div>
                <h4 className="text-2xl font-bold text-yellow-400">#{internData.rank}</h4>
                <p className="text-yellow-300/80 text-sm">Your Rank</p>
                <div className="mt-2 text-xs text-yellow-200/60">
                  🔥 +{internData.monthlyGrowth}% this month
                </div>
              </div>

              {/* Total Raised */}
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 p-6 rounded-xl border border-green-500/20 text-center">
                <div className="bg-green-500/20 p-3 rounded-full w-fit mx-auto mb-3">
                  <DollarSign className="text-green-400" size={24} />
                </div>
                <h4 className="text-2xl font-bold text-green-400">${internData.totalDonations.toLocaleString()}</h4>
                <p className="text-green-300/80 text-sm">Total Raised</p>
                <div className="mt-2 text-xs text-green-200/60">
                  💰 {progressPercentage.toFixed(1)}% of goal
                </div>
              </div>

              {/* Donors Count */}
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 p-6 rounded-xl border border-blue-500/20 text-center">
                <div className="bg-blue-500/20 p-3 rounded-full w-fit mx-auto mb-3">
                  <Users className="text-blue-400" size={24} />
                </div>
                <h4 className="text-2xl font-bold text-blue-400">{internData.donorsCount}</h4>
                <p className="text-blue-300/80 text-sm">Active Donors</p>
                <div className="mt-2 text-xs text-blue-200/60">
                  👥 +12 this week
                </div>
              </div>

              {/* Rewards Unlocked */}
              <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/30 p-6 rounded-xl border border-purple-500/20 text-center">
                <div className="bg-purple-500/20 p-3 rounded-full w-fit mx-auto mb-3">
                  <Trophy className="text-purple-400" size={24} />
                </div>
                <h4 className="text-2xl font-bold text-purple-400">{rewards.filter(r => r.unlocked).length}</h4>
                <p className="text-purple-300/80 text-sm">Rewards Earned</p>
                <div className="mt-2 text-xs text-purple-200/60">
                  🏆 {internData.totalDonations >= 15000 ? 'Silver Champion' : internData.totalDonations >= 5000 ? 'Bronze Fundraiser' : 'Getting Started'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Leaderboard */}
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    🏆 Fundraising Leaderboard
                  </h3>
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <TrendingUp className="text-blue-400" size={16} />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {leaderboard.map((person) => (
                    <div
                      key={person.id}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        person.isCurrentUser
                          ? 'bg-blue-900/30 border-blue-500/30 ring-1 ring-blue-500/20'
                          : 'bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{person.badge}</span>
                          <span className={`text-sm font-bold ${
                            person.rank <= 3 ? 'text-yellow-400' : 'text-gray-400'
                          }`}>
                            #{person.rank}
                          </span>
                        </div>
                        
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className={`w-10 h-10 rounded-full object-cover border-2 ${
                            person.isCurrentUser ? 'border-blue-500/50' : 'border-gray-600/50'
                          }`}
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              person.isCurrentUser ? 'text-blue-400' : 'text-white'
                            }`}>
                              {person.name} {person.isCurrentUser && '(You)'}
                            </h4>
                            <span className="text-green-400 text-sm font-bold">
                              ${person.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-gray-400 text-xs">
                              {person.donors} donors
                            </p>
                            <span className="text-emerald-400 text-xs">
                              {person.growth}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress & Goals */}
              <div className="space-y-6">
                {/* Progress Card */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      🎯 Goal Progress
                    </h3>
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <Target className="text-green-400" size={16} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-green-400">
                        ${internData.totalDonations.toLocaleString()}
                      </span>
                      <span className="text-gray-400">
                        / ${internData.target.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-600 to-green-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{progressPercentage.toFixed(1)}% Complete</span>
                      <span>${(internData.target - internData.totalDonations).toLocaleString()} to go</span>
                    </div>
                  </div>
                </div>

                {/* Referral Code Card */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🔗 Your Referral Code
                  </h3>
                  <div className="flex items-center space-x-3 bg-gray-900/50 p-4 rounded-lg">
                    <code className="flex-1 text-green-400 font-mono text-lg">
                      {internData.referralCode}
                    </code>
                    <button
                      onClick={copyReferralCode}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    📤 Share this code with potential donors to track your referrals
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                ⚡ Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4 p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <span className="text-green-400">💰</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">New donation received</p>
                    <p className="text-gray-400 text-sm">John Smith donated $250 • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <span className="text-blue-400">📈</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Moved up in rankings</p>
                    <p className="text-gray-400 text-sm">You're now #{internData.rank} on the leaderboard • 5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="bg-purple-500/20 p-2 rounded-full">
                    <span className="text-purple-400">🏆</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Achievement unlocked</p>
                    <p className="text-gray-400 text-sm">{internData.totalDonations >= 15000 ? 'Silver Champion' : 'Bronze Fundraiser'} badge earned • 1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Fixed Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 transition-all duration-300 z-30 ${
        sidebarOpen ? 'w-64' : 'w-0 lg:w-64'
      }`}>
        <div className={`${sidebarOpen ? 'block' : 'hidden lg:block'} h-full`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              FundNest
            </h1>
          </div>
          
          {/* Sidebar Navigation */}
          <div className="p-6 space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Enhanced Top Bar */}
        <div className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent lg:hidden">
                FundNest
              </h1>
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-64"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-lg transition-all duration-200"
                >
                  <Bell size={20} className="text-gray-400" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50 max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <h3 className="text-sm font-medium text-white">Notifications</h3>
                    </div>
                    <div className="py-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-700/50 transition-colors cursor-pointer border-l-4 ${
                            notification.unread ? 'border-blue-500 bg-blue-900/10' : 'border-transparent'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.unread ? 'bg-blue-500' : 'bg-gray-600'
                            }`}></div>
                            <div className="flex-1">
                              <p className={`text-sm ${
                                notification.unread ? 'text-white font-medium' : 'text-gray-300'
                              }`}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Section */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <img
                    src={internData.avatar}
                    alt={internData.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-500/30"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white">{internData.name}</p>
                    <p className="text-xs text-gray-400">Fundraising Intern</p>
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${
                    profileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <div className="flex items-center space-x-3">
                        <img
                          src={internData.avatar}
                          alt={internData.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                        />
                        <div>
                          <p className="font-medium text-white">{internData.name}</p>
                          <p className="text-sm text-gray-400">{internData.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors">
                        View Profile
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors">
                        Settings
                      </button>
                      <hr className="my-2 border-gray-700" />
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50 transition-colors"
                        onClick={handleSignOut}>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderContent()}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Profile dropdown overlay */}
      {profileDropdownOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setProfileDropdownOpen(false)}
        ></div>
      )}
      
      {/* Notifications dropdown overlay */}
      {notificationOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setNotificationOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;