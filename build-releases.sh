#!/bin/bash

# EngageMate Release Builder
# Builds desktop installers for all platforms

echo "🏗️  Building EngageMate Desktop Releases..."

# Ensure Rust is available
source "$HOME/.cargo/env"

# Build for current platform
echo "📦 Building for current platform..."
cargo tauri build

# Show output files
echo "✅ Build complete! Installers created:"
echo ""

if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 macOS:"
    find src-tauri/target/release/bundle -name "*.dmg" -exec echo "  {}" \;
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🐧 Linux:"
    find src-tauri/target/release/bundle -name "*.deb" -exec echo "  {}" \;
    find src-tauri/target/release/bundle -name "*.rpm" -exec echo "  {}" \;
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    echo "🪟 Windows:"
    find src-tauri/target/release/bundle -name "*.msi" -exec echo "  {}" \;
fi

echo ""
echo "🚀 Ready for distribution!"
echo "Upload these files to GitHub Releases or your download server."
