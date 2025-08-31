# 🤖 EngageMate

AI-powered Reddit auto-commenting tool for marketing campaigns.

## 🚀 Quick Start

### Option 1: Desktop App (Single-Click) 🖥️
```bash
git clone https://github.com/yourusername/engagemate.git
cd engagemate
./start-desktop.sh
```

**Desktop app launches automatically!** No browser needed. 🎉

### Option 2: Local Development
```bash
git clone https://github.com/yourusername/engagemate.git
cd engagemate
npm install
npx prisma db push    # Setup SQLite database
npm run dev           # Start web version
```

Visit `http://localhost:3000`

## 📋 Setup Guide

1. **Reddit API Setup**
   - Go to [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)
   - Create a new "script" app
   - Copy Client ID and Secret to Settings tab

2. **Add Your Products**
   - Go to Products tab
   - Add your products with descriptions
   - Include product links (optional)

3. **Start Auto-Commenting**
   - Go to Comments tab
   - Select a product and target subreddits
   - Let AI find posts and generate comments
   - Review and post comments

## 🛠️ Features

- ✅ **Product Management** - Store your products in database
- ✅ **Reddit Integration** - Search posts by subreddit/keywords
- ✅ **AI Comment Generation** - Contextual, natural comments
- ✅ **Comment Management** - Review before posting
- ✅ **Modern Stack** - Next.js 14, TypeScript, Tailwind, SQLite

## 🔧 Configuration

### Environment Variables
```bash
# SQLite database is automatically created
# No DATABASE_URL needed!
OPENAI_API_KEY="your-openai-api-key"  # Optional for AI features
```

### Reddit Settings
Configure in the Settings tab:
- Client ID
- Client Secret  
- User Agent

## 🏗️ Building Desktop Installers

Create distributable desktop apps for all platforms:

```bash
# Development (opens desktop window)
cargo tauri dev

# Build installers (.dmg, .exe, .deb)
cargo tauri build
```

**Output files:**
- **macOS**: `src-tauri/target/release/bundle/dmg/EngageMate_0.1.0_aarch64.dmg`
- **Windows**: `src-tauri/target/release/bundle/msi/EngageMate_0.1.0_x64_en-US.msi`
- **Linux**: `src-tauri/target/release/bundle/deb/engagemate_0.1.0_amd64.deb`

Users just double-click to install! 🚀

## 📥 How Users Download & Install

### **For End Users (Non-Technical):**
1. **Visit Releases**: Go to GitHub Releases page
2. **Download**: Click the installer for your OS:
   - **macOS**: `EngageMate_0.1.0_aarch64.dmg`
   - **Windows**: `EngageMate_0.1.0_x64_en-US.msi` 
   - **Linux**: `engagemate_0.1.0_amd64.deb`
3. **Install**: Double-click the downloaded file
4. **Launch**: Click the EngageMate icon on desktop/applications
5. **Done!** App opens ready to use (database auto-configured)

### **For Developers:**
```bash
git clone https://github.com/yourusername/engagemate.git
cd engagemate
./start-desktop.sh  # Auto-installs everything and launches
```

### **Automated Releases:**
- **GitHub Actions** builds installers for all platforms automatically
- **Tag a release** (`git tag v1.0.0`) → installers appear in Releases
- **Auto-updater** keeps users on latest version

## 📚 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Prisma ORM (client-side)
- **Database**: SQLite (embedded)
- **Desktop**: Tauri (Rust + WebView)
- **Distribution**: GitHub Releases, Direct Download

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

Use responsibly and follow Reddit's terms of service. This tool is for legitimate marketing purposes only.