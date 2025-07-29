import Image from "next/image"

const featureBlogs = [
  {
    id: "dashboard",
    title: "📊 Dashboard Overview",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder-logo.png",
    author: "Team Prospectify",
    content: `The Dashboard is your main hub after login. Here, you can quickly access all major features: campaigns, analytics, profile, and settings. The sidebar or top navigation makes it easy to switch between sections, view stats, and get a snapshot of your marketing performance. Designed for clarity and speed, the dashboard helps you stay organized and focused on your goals.`
  },
  {
    id: "campaigns",
    title: "🎯 Campaigns – Your Marketing Engine",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder-user.jpg",
    author: "Team Prospectify",
    content: `The Campaigns section lets you create, view, and manage all your marketing campaigns. Launch new campaigns with targeted options, track their status, and review key metrics like reach, engagement, and ROI. Prospectify makes campaign management simple, so you can focus on results instead of busywork.`
  },
  {
    id: "analytics",
    title: "📈 Analytics – Data-Driven Decisions",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder.jpg",
    author: "Team Prospectify",
    content: `Analytics is where you unlock the power of Prospectify. Get real-time city recommendations based on Eurostat data, visualize campaign performance, and export reports for deeper analysis. With clear charts and actionable insights, you can make smarter decisions and maximize your marketing impact.`
  },
  {
    id: "profile",
    title: "👤 Profile – Your Personal Space",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder-user.jpg",
    author: "Team Prospectify",
    content: `The Profile section lets you view and update your personal information, check your activity history, and set preferences for notifications and privacy. Security features like password management and two-factor authentication keep your account safe. Stay in control of your data and experience.`
  },
  {
    id: "settings",
    title: "⚙️ Settings – Customize Your Experience",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder.svg",
    author: "Team Prospectify",
    content: `Settings is where you fine-tune Prospectify to fit your workflow. Configure campaign defaults, connect integrations like Supabase, and manage notification preferences. The modular design means you can adapt the app to your needs, ensuring a smooth and personalized experience every time.`
  },
]

const generalBlogs = [
  {
    title: "� Blog 6: Dashboard Overview",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder-logo.png",
    author: "Team Prospectify",
    content: `The Dashboard is your main hub after login. Here, you can quickly access all major features: campaigns, analytics, profile, and settings. The sidebar or top navigation makes it easy to switch between sections, view stats, and get a snapshot of your marketing performance. Designed for clarity and speed, the dashboard helps you stay organized and focused on your goals.`
  },
  {
    title: "🎯 Blog 7: Campaigns – Your Marketing Engine",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder-user.jpg",
    author: "Team Prospectify",
    content: `The Campaigns section lets you create, view, and manage all your marketing campaigns. Launch new campaigns with targeted options, track their status, and review key metrics like reach, engagement, and ROI. Prospectify makes campaign management simple, so you can focus on results instead of busywork.`
  },
  {
    title: "📈 Blog 8: Analytics – Data-Driven Decisions",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder.jpg",
    author: "Team Prospectify",
    content: `Analytics is where you unlock the power of Prospectify. Get real-time city recommendations based on Eurostat data, visualize campaign performance, and export reports for deeper analysis. With clear charts and actionable insights, you can make smarter decisions and maximize your marketing impact.`
  },
  {
    title: "👤 Blog 9: Profile – Your Personal Space",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder-user.jpg",
    author: "Team Prospectify",
    content: `The Profile section lets you view and update your personal information, check your activity history, and set preferences for notifications and privacy. Security features like password management and two-factor authentication keep your account safe. Stay in control of your data and experience.`
  },
  {
    title: "⚙️ Blog 10: Settings – Customize Your Experience",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder.svg",
    author: "Team Prospectify",
    content: `Settings is where you fine-tune Prospectify to fit your workflow. Configure campaign defaults, connect integrations like Supabase, and manage notification preferences. The modular design means you can adapt the app to your needs, ensuring a smooth and personalized experience every time.`
  },
  {
    title: " What is Prospectify?",
    date: "Published: July 2025",
    category: "Overview",
    image: "/placeholder-logo.png",
    author: "Team Prospectify",
    content: `Prospectify is a smart location intelligence platform designed to help small and medium-sized businesses (SMBs) launch more effective marketing campaigns. Instead of guessing which cities to target, Prospectify helps you decide using real demographic and economic data from trusted European sources like Eurostat and INSEE.\n\nBy analyzing factors like income, education, and age distribution, it shows you which cities are the best match for your ideal audience — saving time and boosting ROI.`
  },
  {
    title: "🧠 Why SMBs Need Data-Driven Targeting",
    date: "Published: July 2025",
    category: "Problem-Solving",
    image: "/placeholder-user.jpg",
    author: "Team Prospectify",
    content: `Many marketing teams struggle to choose the right regions for their campaigns. They often:\n\n- Waste money on low-performing locations\n- Rely on instinct instead of insight\n- Lack access to solid, up-to-date data\n\nProspectify solves this by providing data-backed city recommendations.\nYou don’t need to be a data scientist — just log in, explore city profiles, and start creating focused campaigns that actually reach the right people.`
  },
  {
    title: "⚙️ How It Works: A Look Under the Hood",
    date: "Published: July 2025",
    category: "Tech Stack",
    image: "/placeholder.jpg",
    author: "Team Prospectify",
    content: `Prospectify is built with modern tools:\n\n- Frontend: Next.js on Vercel\n- Backend: Supabase (PostgreSQL + Auth)\n- Data: Eurostat, INSEE, and other EU sources\n\nEvery user has secure, private access to their campaigns. City and demographic data is public, but your campaign data is protected by Supabase’s Row-Level Security (RLS) — a feature that limits access to only the campaign’s owner.\n\nWe also use mock performance metrics to let users visualize campaign impact across locations.`
  },
  {
    title: "🔐 Built for Privacy and Trust",
    date: "Published: July 2025",
    category: "Data & Security",
    image: "/placeholder.svg",
    author: "Team Prospectify",
    content: `Data privacy is critical — especially when dealing with user info or public datasets. Prospectify is designed with this in mind:\n\n- Uses only public, non-personal datasets\n- No sensitive data is stored, beyond user email\n- Auth is handled via Supabase, and access is tightly controlled\n- Built with GDPR principles: privacy, transparency, and control\n\nAs we grow, we’ll also add features like data export, deletion, and consent management.`
  },
  {
    title: "🚀 Why Prospectify Matters",
    date: "Published: July 2025",
    category: "Value & Outcomes",
    image: "/placeholder-logo.svg",
    author: "Team Prospectify",
    content: `Prospectify gives marketing teams:\n\n- Faster decision-making\n- Higher campaign ROI\n- Better understanding of European markets\n\nInstead of spending weeks doing manual research, users can log in, explore cities, and confidently launch their next campaign — knowing they’ve chosen the best location based on real numbers.\n\nThis is data for action, not just for reports.`
  },
]

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <a href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            ← Back to Home
          </a>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-blue-900">Prospectify Blog</h1>
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Feature Guides</h2>
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {featureBlogs.map((post, idx) => (
            <a
              key={idx}
              href={`/blogs/${post.id}`}
              className="block transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl bg-white border border-blue-100 p-6 rounded-xl shadow-none cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <Image src={post.image} alt={post.title} width={48} height={48} className="rounded mr-4 border border-blue-200 bg-blue-50" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-800">{post.title}</h3>
                  <p className="text-sm text-blue-600 mb-2">
                    Published: {post.date} · <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{post.category}</span>
                  </p>
                  <div className="text-xs text-blue-500 mt-1">- with <span className="font-medium">{post.author}</span></div>
                </div>
              </div>
              <p className="text-blue-900 text-sm whitespace-pre-line">{post.content}</p>
            </a>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-4 text-blue-800">General Blogs</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {generalBlogs.map((post, idx) => (
            <div
              key={idx}
              className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl bg-white border border-blue-100 p-6 rounded-xl shadow-none"
            >
              <div className="flex items-center mb-4">
                <Image src={post.image} alt={post.title} width={48} height={48} className="rounded mr-4 border border-blue-200 bg-blue-50" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-800">{post.title}</h3>
                  <p className="text-sm text-blue-600 mb-2">
                    Published: {post.date} · <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{post.category}</span>
                  </p>
                  <div className="text-xs text-blue-500 mt-1">Written by <span className="font-medium">{post.author}</span></div>
                </div>
              </div>
              <p className="text-blue-900 text-sm whitespace-pre-line">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
