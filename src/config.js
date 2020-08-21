module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/project-manager',
  JWT_SECRET: process.env.JWT_SECRET
}

//postgres://uqhiwmsvhgmdgb:f3c1f7039d4806e25f061baee430aa1bde67e88a3a61d178d3552e80d7eaec16@ec2-54-166-107-5.compute-1.amazonaws.com:5432/d2th03mpisu2sf
