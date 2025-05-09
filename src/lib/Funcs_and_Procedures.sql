-- AI generated; yet to be modified and added upon

USE optimakeDB;

-- ================================================
-- STORED FUNCTIONS
-- ================================================
DELIMITER $$

-- Function: Retrieve available time slots for a specific faculty member
CREATE FUNCTION GetAvailableTimeSlots(faculty_ID INT)
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE slots VARCHAR(255);
    SELECT available_time_slots INTO slots
    FROM Faculty
    WHERE faculty_ID = faculty_ID;
    RETURN slots;
END $$

-- Function: Calculate Age based on birthdate
CREATE FUNCTION CalculateAge(birthdate DATE)
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN TIMESTAMPDIFF(YEAR, birthdate, CURDATE());
END $$

-- Function: Calculate End Time of a session
CREATE FUNCTION CalculateEndTime(start_time TIME, duration INT)
RETURNS TIME
DETERMINISTIC
BEGIN
    RETURN ADDTIME(start_time, SEC_TO_TIME(duration * 60));
END $$

-- Function: Check Faculty Availability
CREATE FUNCTION CheckFacultyAvailability(faculty_ID INT, day ENUM('M', 'T', 'W', 'Th', 'F', 'S'), start_time TIME, duration INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM Schedule
        WHERE faculty_ID = faculty_ID AND day = day
        AND (start_time < CalculateEndTime(start_time, duration) AND CalculateEndTime(start_time, duration) > start_time)
    );
END $$

-- Function: Check Room Availability
CREATE FUNCTION CheckRoomAvailability(room_ID INT, day ENUM('M', 'T', 'W', 'Th', 'F', 'S'), start_time TIME, duration INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM Schedule
        WHERE room_ID = room_ID AND day = day
        AND (start_time < CalculateEndTime(start_time, duration) AND CalculateEndTime(start_time, duration) > start_time)
    );
END $$

-- Function: Validate Course Section Schedule
CREATE FUNCTION ValidateCourseSectionSchedule(section_ID INT, faculty_ID INT, day ENUM('M', 'T', 'W', 'Th', 'F', 'S'), start_time TIME, duration INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM Schedule
        WHERE faculty_ID = faculty_ID AND day = day
        AND (start_time < CalculateEndTime(start_time, duration) AND CalculateEndTime(start_time, duration) > start_time)
    );
END $$

-- ================================================
-- STORED PROCEDURES
-- ================================================

-- Procedure: Create New Account
CREATE PROCEDURE CreateNewAccount(IN username VARCHAR(255), IN password_hash VARCHAR(255), IN role ENUM('Admin', 'Dean', 'Chairperson'))
BEGIN
    INSERT INTO Users (username, password_hash, role)
    VALUES (username, password_hash, role);
END $$

-- Procedure: Authenticate User
CREATE PROCEDURE AuthenticateUser(IN username VARCHAR(255), IN input_password VARCHAR(255), OUT isAuthenticated BOOLEAN)
BEGIN
    DECLARE stored_hash VARCHAR(255);
    SELECT password_hash INTO stored_hash FROM Users WHERE username = username;
    SET isAuthenticated = (stored_hash = input_password);
END $$

-- Procedure: Change User Password
CREATE PROCEDURE ChangeUserPassword(IN username VARCHAR(255), IN new_password_hash VARCHAR(255))
BEGIN
    UPDATE Users SET password_hash = new_password_hash WHERE username = username;
END $$

-- Procedure: Assign Faculty to Schedule
CREATE PROCEDURE AssignFacultyToSchedule(IN faculty_ID INT, IN schedule_ID INT)
BEGIN
    IF CheckFacultyAvailability(faculty_ID, (SELECT day FROM Schedule WHERE schedule_ID = schedule_ID),
                                (SELECT start_time FROM Schedule WHERE schedule_ID = schedule_ID),
                                (SELECT duration FROM Schedule WHERE schedule_ID = schedule_ID)) THEN
        UPDATE Schedule SET faculty_ID = faculty_ID WHERE schedule_ID = schedule_ID;
    END IF;
END $$

-- Procedure: Get Faculty Schedule
CREATE PROCEDURE GetFacultySchedule(IN faculty_ID INT)
BEGIN
    SELECT * FROM Schedule WHERE faculty_ID = faculty_ID;
END $$

-- Procedure: Add New Faculty Member
CREATE PROCEDURE AddNewFacultyMember(IN name VARCHAR(255), IN department_ID INT, IN birthdate DATE, IN contact_info VARCHAR(255))
BEGIN
    INSERT INTO Faculty (name, department_ID, birthdate, contact_info)
    VALUES (name, department_ID, birthdate, contact_info);
END $$

-- Procedure: Update Faculty Information
CREATE PROCEDURE UpdateFacultyInformation(IN faculty_ID INT, IN contact_info VARCHAR(255), IN department_ID INT)
BEGIN
    UPDATE Faculty
    SET contact_info = contact_info, department_ID = department_ID
    WHERE faculty_ID = faculty_ID;
END $$

-- Procedure: Delete Faculty Record
CREATE PROCEDURE DeleteFacultyRecord(IN faculty_ID INT)
BEGIN
    DELETE FROM Faculty WHERE faculty_ID = faculty_ID;
END $$

-- Procedure: List Faculty by Department
CREATE PROCEDURE ListFacultyByDepartment(IN department_ID INT)
BEGIN
    SELECT * FROM Faculty WHERE department_ID = department_ID;
END $$

-- Procedure: List Available Rooms
CREATE PROCEDURE ListAvailableRooms(IN day ENUM('M', 'T', 'W', 'Th', 'F', 'S'), IN start_time TIME, IN duration INT)
BEGIN
    SELECT * FROM Room WHERE room_ID NOT IN (
        SELECT room_ID FROM Schedule WHERE day = day
        AND (start_time < CalculateEndTime(start_time, duration) AND CalculateEndTime(start_time, duration) > start_time)
    );
END $$

DELIMITER ;
