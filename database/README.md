# College ERP System Database

Welcome to the College ERP System Database project. This directory contains a complete, highly-scalable, production-ready PostgreSQL database architecture for a modern college or university.

## Architecture Highlights
- **Multi-Tenancy**: Supports multiple campuses seamlessly via a consolidated `campuses` table structure.
- **Academic Metrics**: Tracks attendance and exam results strictly per subject (not broadly by course), matching real-world collegiate requirements.
- **Transactional Entities**: Fully handles dynamic fee transactions, assignment submissions, and student leave requests.
- **Library Module**: Natively integrated book tracking and issue records mapped securely to students.
- **Robust Security**: Enforced UUIDs across all tables to prevent ID enumeration and scraping.

## Project Structure
- `schema.sql` - The complete Data Definition Language (DDL) for creating the tables, constraints, triggers, and optimization indexes.
- `seed.sql` - Contains robust, dynamic sample data generated via standard PostgreSQL Common Table Expressions (CTEs).
- `ER_DIAGRAM.md` - The complete visual Entity Relationship Diagram mapping all primary and foreign key constraints using standard Mermaid syntax.

## Setup Instructions
You can easily spin up the database by running the following commands in your PostgreSQL environment:

### Method 1: Using the Command Line (psql)
1. Open PowerShell or Command Prompt.
2. Connect to your PostgreSQL server:
```bash
psql -U postgres
```
3. Create the database and connect to it:
```sql
CREATE DATABASE college_erp;
\c college_erp;
```
4. Run the setup scripts from this folder:
```bash
# Execute the schema to build the tables
\i 'schema.sql'

# Execute the seed data to populate the tables
\i 'seed.sql'
```

### Method 2: Using pgAdmin
1. Open pgAdmin, right-click on **Databases**, and select **Create > Database**. Name it `college_erp`.
2. Right-click on the new database and select **Query Tool**.
3. Open `schema.sql`, paste the contents into the Query Tool, and hit Execute.
4. Clear the tool, open `seed.sql`, paste the contents, and hit Execute.
