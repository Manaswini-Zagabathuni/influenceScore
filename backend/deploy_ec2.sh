#!/bin/bash
# EC2 Ubuntu setup script for InfluenceScore backend
# Run once on a fresh Ubuntu 22.04 instance

set -e

echo "=== Updating system ==="
sudo apt-get update && sudo apt-get upgrade -y

echo "=== Installing Python 3.11 ==="
sudo apt-get install -y python3.11 python3.11-venv python3-pip

echo "=== Installing Nginx ==="
sudo apt-get install -y nginx

echo "=== Cloning repo ==="
# Replace with your actual repo URL
git clone https://github.com/YOUR_USERNAME/influencescore.git /home/ubuntu/influencescore

echo "=== Setting up backend ==="
cd /home/ubuntu/influencescore/backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

echo "=== Creating .env ==="
cat > .env << EOF
ANTHROPIC_API_KEY=YOUR_KEY_HERE
ALLOWED_ORIGINS=https://yourdomain.com
EOF

echo "=== Creating systemd service ==="
sudo tee /etc/systemd/system/influencescore.service > /dev/null << EOF
[Unit]
Description=InfluenceScore FastAPI Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/influencescore/backend
Environment="PATH=/home/ubuntu/influencescore/backend/venv/bin"
ExecStart=/home/ubuntu/influencescore/backend/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable influencescore
sudo systemctl start influencescore

echo "=== Configuring Nginx ==="
sudo tee /etc/nginx/sites-available/influencescore > /dev/null << EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/influencescore /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

echo "=== Done! Backend running at http://$(curl -s ifconfig.me) ==="
