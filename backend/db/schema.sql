-- Run this file to create the initial schema


CREATE TABLE IF NOT EXISTS departments (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS electives (
id SERIAL PRIMARY KEY,
code VARCHAR(20) UNIQUE NOT NULL,
name VARCHAR(200) NOT NULL,
department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
semester INTEGER,
prerequisites TEXT, -- comma-separated codes (simple for phase1)
difficulty_level VARCHAR(20), -- low/medium/high
avg_cgpa NUMERIC(3,2),
description TEXT,
created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS students (
id SERIAL PRIMARY KEY,
name VARCHAR(200) NOT NULL,
email VARCHAR(200) UNIQUE NOT NULL,
department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
year INTEGER,
skills TEXT, -- comma-separated
created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS pbl_projects (
id SERIAL PRIMARY KEY,
title VARCHAR(300) NOT NULL,
description TEXT,
related_electives TEXT, -- comma-separated elective codes
difficulty VARCHAR(20),
price INTEGER DEFAULT 0,
is_available BOOLEAN DEFAULT TRUE,
purchased_by INTEGER REFERENCES students(id), -- nullable
purchased_at TIMESTAMP
);


-- seed some departments
INSERT INTO departments (name) VALUES ('CSE') ON CONFLICT DO NOTHING;
INSERT INTO departments (name) VALUES ('ECE') ON CONFLICT DO NOTHING;
INSERT INTO departments (name) VALUES ('IT') ON CONFLICT DO NOTHING;
INSERT INTO departments (name) VALUES ('IntCSE') ON CONFLICT DO NOTHING;


-- sample elective
INSERT INTO electives (code, name, department_id, semester, prerequisites, difficulty_level, avg_cgpa, description)
VALUES ('CSE301', 'Cloud Computing', (SELECT id FROM departments WHERE name='CSE'), 5, '', 'medium', 7.5, 'Intro to cloud services and deployment')
ON CONFLICT DO NOTHING;


-- sample pbl
INSERT INTO pbl_projects (title, description, related_electives, difficulty, price)
VALUES ('Serverless Image Pipeline', 'A serverless pipeline for processing images on cloud', 'CSE301', 'medium', 100)
ON CONFLICT DO NOTHING;