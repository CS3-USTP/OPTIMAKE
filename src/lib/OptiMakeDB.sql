/* 
TODOS:
- hash table
- Sync with schema
- accounts link
- dedic/shared building
- Normalize
- funcs and procedures
  - data types
  - on delete
*/

CREATE DATABASE IF NOT EXISTS optimakeDB;
USE optimakeDB;

CREATE TABLE IF NOT EXISTS `University` (
  `university_ID` INT AUTO_INCREMENT,
  `university_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`university_ID`)
);

CREATE TABLE IF NOT EXISTS `Campus` (
  `campus_ID` INT AUTO_INCREMENT,
  `campus_name` VARCHAR(255) NOT NULL,
  `university_ID` INT NOT NULL,
  `latitude` DECIMAL(9,6),
  `longitude` DECIMAL(9,6),
  PRIMARY KEY (`campus_ID`),
  FOREIGN KEY (`university_ID`) REFERENCES `University`(`university_ID`)
);

CREATE TABLE IF NOT EXISTS `College` (
  `college_ID` INT AUTO_INCREMENT,
  `college_name` VARCHAR(255) NOT NULL,
  `campus_ID` INT NOT NULL,
  PRIMARY KEY (`college_ID`),
  FOREIGN KEY (`campus_ID`) REFERENCES `Campus`(`campus_ID`)
);

CREATE TABLE IF NOT EXISTS `Department` (
  `department_ID` INT AUTO_INCREMENT,
  `department_name` VARCHAR(255) NOT NULL,
  `college_ID` INT NOT NULL,
  PRIMARY KEY (`department_ID`),
  FOREIGN KEY (`college_ID`) REFERENCES `College`(`college_ID`)
);

CREATE TABLE IF NOT EXISTS `Faculty` (
  `faculty_ID` INT AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `units` TINYINT UNSIGNED NOT NULL,
  `birthdate` DATE NOT NULL,
  `age` TINYINT UNSIGNED NOT NULL,
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `contact_number` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (`faculty_ID`)
);

CREATE TABLE IF NOT EXISTS `Faculty_Availability`(
  `faculty_ID` INT,
  `day` ENUM('M', 'T', 'W', 'Th', 'F', 'S') NOT NULL,
  `start_time` TIME NOT NULL,
  `duration` DECIMAL NOT NULL,
  `end_time` TIME NOT NULL,
  FOREIGN KEY (`faculty_ID`) REFERENCES `Faculty`(`faculty_ID`)
);

CREATE TABLE IF NOT EXISTS `Administrator` (
  `admin_ID` INT AUTO_INCREMENT,
  `account_ID` INT NOT NULL,
  `university_ID` INT NOT NULL,
  `campus_ID` INT NOT NULL,
  PRIMARY KEY (`admin_ID`),
  FOREIGN KEY (`account_ID`) REFERENCES `Account`(`account_ID`),
  FOREIGN KEY (`university_ID`) REFERENCES `University`(`university_ID`),
  FOREIGN KEY (`campus_ID`) REFERENCES `Campus`(`campus_ID`)
);

CREATE TABLE IF NOT EXISTS `Dean` (
  `dean_ID` INT AUTO_INCREMENT,
  `college_ID` INT NOT NULL,
  `account_ID` INT NOT NULL,
  `university_ID` INT NOT NULL,
  `campus_ID` INT NOT NULL,
  PRIMARY KEY (`dean_ID`),
  FOREIGN KEY (`college_ID`) REFERENCES `College`(`college_ID`)
  FOREIGN KEY (`account_ID`) REFERENCES `Account`(`account_ID`),
  FOREIGN KEY (`university_ID`) REFERENCES `University`(`university_ID`),
  FOREIGN KEY (`campus_ID`) REFERENCES `Campus`(`campus_ID`)
);

CREATE TABLE IF NOT EXISTS `Chairperson` (
  `chairperson_ID` INT AUTO_INCREMENT,
  `department_ID` INT NOT NULL,
  `account_ID` INT NOT NULL,
  `university_ID` INT NOT NULL,
  `campus_ID` INT NOT NULL,
  `college_ID` INT NOT NULL,
  PRIMARY KEY (`chairperson_ID`),
  FOREIGN KEY (`department_ID`) REFERENCES `Department`(`department_ID`)
  FOREIGN KEY (`account_ID`) REFERENCES `Account`(`account_ID`),
  FOREIGN KEY (`university_ID`) REFERENCES `University`(`university_ID`),
  FOREIGN KEY (`campus_ID`) REFERENCES `Campus`(`campus_ID`),
  FOREIGN KEY (`college_ID`) REFERENCES `College`(`college_ID`)
);

CREATE TABLE IF NOT EXISTS `Account` (
  `account_ID` INT AUTO_INCREMENT,
  `username` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('Administrator', 'Dean', 'Chairperson') NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `birthdate` DATE NOT NULL,
  `age` TINYINT UNSIGNED NOT NULL,
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `contact_number` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (`account_ID`)
);

CREATE TABLE IF NOT EXISTS `Hash` (
  `hash_ID` INT AUTO_INCREMENT,
  `account_ID` INT NOT NULL,
  `issued_by` INT NOT NULL,
  `role` ENUM('Administrator', 'Dean', 'Chairperson') NOT NULL,
  `hash` VARCHAR(255) NOT NULL,
  `status` ENUM('Enabled', 'Disabled') DEFAULT 'Enabled',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`account_ID`) REFERENCES `Account`(`account_ID`),
  FOREIGN KEY (`issued_by`) REFERENCES `Account`(`account_ID`),
  PRIMARY KEY (`hash_ID`)
);

CREATE TABLE IF NOT EXISTS `Building` (
  `building_ID` INT AUTO_INCREMENT,
  `building_no` INT UNSIGNED,
  `building_name` VARCHAR,
  `college_ID` INT,
  `latitude` DECIMAL(9,6),
  `longitude` DECIMAL(9,6),
  PRIMARY KEY (`building_ID`),
  FOREIGN KEY (`college_ID`) REFERENCES `College`(`college_ID`)
);

CREATE TABLE IF NOT EXISTS `Apparatus` (
  `apparatus_ID` INT AUTO_INCREMENT,
  `apparatus_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`apparatus_ID`)
);

CREATE TABLE IF NOT EXISTS `Room` (
  `room_ID` INT AUTO_INCREMENT,
  `room_no` INT UNSIGNED NOT NULL,
  `room_name` VARCHAR(255),
  `building_ID` INT NOT NULL,
  `floor_no` TINYINT UNSIGNED NOT NULL,
  `apparatus_ID` INT,
  PRIMARY KEY (`room_ID`),
  FOREIGN KEY (`apparatus_ID`) REFERENCES `Apparatus`(`apparatus_ID`),
  FOREIGN KEY (`building_ID`) REFERENCES `Building`(`building_ID`)
);

CREATE TABLE IF NOT EXISTS `Section` (
  `section_ID` INT AUTO_INCREMENT,
  `section_name` VARCHAR(255) NOT NULL,
  `year_level` ENUM('1st', '2nd', '3rd', '4th', '5th') NOT NULL,
  `university_ID` INT NOT NULL,
  `campus_ID` INT NOT NULL,
  `college_ID` INT NOT NULL,
  `department_ID` INT NOT NULL,
  PRIMARY KEY (`section_ID`),
  FOREIGN KEY (`university_ID`) REFERENCES `University`(`university_ID`),
  FOREIGN KEY (`campus_ID`) REFERENCES `Campus`(`campus_ID`),
  FOREIGN KEY (`college_ID`) REFERENCES `College`(`college_ID`),
  FOREIGN KEY (`department_ID`) REFERENCES `Department`(`department_ID`)
);

CREATE TABLE IF NOT EXISTS `Course` (
  `course_ID` INT AUTO_INCREMENT,
  `course_code` VARCHAR(255) UNIQUE NOT NULL,
  `course_title` VARCHAR(255) NOT NULL,
  `units` TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (`course_ID`)
);

CREATE TABLE IF NOT EXISTS `Course_Section` (
  `course_ID` INT NOT NULL,
  `section_ID` INT NOT NULL,
  FOREIGN KEY (`course_ID`) REFERENCES `Course`(`course_ID`),
  FOREIGN KEY (`section_ID`) REFERENCES `Section`(`section_ID`)
);

CREATE TABLE IF NOT EXISTS `Schedule` (
  `schedule_ID` INT AUTO_INCREMENT,
  `section_ID` INT NOT NULL,
  `course_ID` INT NOT NULL,
  `faculty_ID` INT,
  `room_ID` INT,
  `day` ENUM('M', 'T', 'W', 'Th', 'F', 'S') NOT NULL,
  `start_time` TIME NOT NULL,
  `duration` DECIMAL NOT NULL,
  `end_time` TIME NOT NULL,
  PRIMARY KEY (`schedule_ID`),
  FOREIGN KEY (`section_ID`) REFERENCES `Section`(`section_ID`),
  FOREIGN KEY (`course_ID`) REFERENCES `Course`(`course_ID`),
  FOREIGN KEY (`faculty_ID`) REFERENCES `Faculty`(`faculty_ID`),
  FOREIGN KEY (`room_ID`) REFERENCES `Room`(`room_ID`)
);
