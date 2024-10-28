CREATE TABLE one_time_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name VARCHAR(255) NOT NULL,
    file_content BYTEA NOT NULL,
    email_to VARCHAR(255) NOT NULL,
    email_from VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    downloaded BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0
); 