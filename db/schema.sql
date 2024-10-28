CREATE TABLE one_time_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    file_name VARCHAR(255),
    file_key VARCHAR(255),
    email_to VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    downloaded BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0
); 