USE optimakeDB;

-- DUMMY DATA FOR TESTING=================================================================================================================

-- INSERT DUMMY DATA========================================
DELIMITER $$

CREATE PROCEDURE InsertAllData()
BEGIN
    -- Insert into University
    INSERT INTO University (university_name) VALUES
    ('University A'), ('University B'), ('University C'), ('University D'), ('University E');
    
    -- Insert into Campus
    INSERT INTO Campus (campus_name, university_ID, latitude, longitude) VALUES
    ('Campus A1', 1, 8.4772, 124.6450),
    ('Campus B1', 2, 8.4773, 124.6451),
    ('Campus C1', 3, 8.4774, 124.6452),
    ('Campus D1', 4, 8.4775, 124.6453),
    ('Campus E1', 5, 8.4776, 124.6454);
    
    -- Insert into College
    INSERT INTO College (college_name, campus_ID) VALUES
    ('College of Science', 1), ('College of Engineering', 2), ('College of Arts', 3), ('College of Business', 4), ('College of Education', 5);
    
    -- Insert into Department
    INSERT INTO Department (department_name, college_ID) VALUES
    ('Computer Science', 1), ('Electrical Engineering', 2), ('Fine Arts', 3), ('Marketing', 4), ('Secondary Education', 5);
    
    -- Insert into Faculty
    INSERT INTO Faculty (first_name, last_name, units, birthdate, age, gender, contact_number, email) VALUES
    ('John', 'Doe', 12, '1980-05-15', 44, 'Male', '09171234567', 'john.doe@example.com'),
    ('Jane', 'Smith', 15, '1985-08-22', 39, 'Female', '09172345678', 'jane.smith@example.com');
    
    -- Insert into Faculty_Availability
    INSERT INTO Faculty_Availability (faculty_ID, day, start_time, duration, end_time) VALUES
    (1, 'M', '08:00:00', 1.5, '09:30:00'),
    (2, 'T', '10:00:00', 2, '12:00:00');
    
    -- Insert into Account
    INSERT INTO Account (username, password, role, first_name, last_name, birthdate, age, gender, contact_number, email) VALUES
    ('admin1', 'pass123', 'Administrator', 'Alice', 'Johnson', '1988-10-10', 36, 'Female', '09173456789', 'alice.johnson@example.com');
    
    -- Insert into Administrator
    INSERT INTO Administrator (account_ID, university_ID, campus_ID) VALUES (1, 1, 1);
    
    -- Insert into Building
    INSERT INTO Building (building_no, building_name, college_ID, latitude, longitude) VALUES
    (1, 'Science Building', 1, 8.4780, 124.6460);
    
    -- Insert into Apparatus
    INSERT INTO Apparatus (apparatus_name) VALUES ('Projector');
    
    -- Insert into Room
    INSERT INTO Room (room_no, room_name, building_ID, floor_no, apparatus_ID) VALUES
    (101, 'Lab A1', 1, 1, 1);
    
    -- Insert into Section
    INSERT INTO Section (section_name, year_level, university_ID, campus_ID, college_ID, department_ID) VALUES
    ('CS 1-A', '1st', 1, 1, 1, 1);
    
    -- Insert into Course
    INSERT INTO Course (course_code, course_title, units) VALUES
    ('CS101', 'Introduction to Computer Science', 3);
    
    -- Insert into Course_Section
    INSERT INTO Course_Section (course_ID, section_ID) VALUES (1, 1);
    
    -- Insert into Schedule
    INSERT INTO Schedule (section_ID, course_ID, faculty_ID, room_ID, day, start_time, duration, end_time) VALUES
    (1, 1, 1, 1, 'M', '09:30:00', 1.5, '11:00:00');
END $$


-- DELETE DUMMY DATA===============================================================

-- Procedure to delete all dummy data from all tables
CREATE PROCEDURE DeleteAllData()
BEGIN
    DELETE FROM Schedule;
    DELETE FROM Course_Section;
    DELETE FROM Course;
    DELETE FROM Section;
    DELETE FROM Room;
    DELETE FROM Apparatus;
    DELETE FROM Building;
    DELETE FROM Faculty_Availability;
    DELETE FROM Faculty;
    DELETE FROM Department;
    DELETE FROM College;
    DELETE FROM Campus;
    DELETE FROM University;
    DELETE FROM Account;
    DELETE FROM Administrator;
END $$

-- DISPLAY DUMMY DATA===============================================================
CREATE PROCEDURE ShowAllTables()
BEGIN
    SELECT * FROM University;
    SELECT * FROM Campus;
    SELECT * FROM College;
    SELECT * FROM Department;
    SELECT * FROM Faculty;
    SELECT * FROM Faculty_Availability;
    SELECT * FROM Account;
    SELECT * FROM Administrator;
    SELECT * FROM Building;
    SELECT * FROM Apparatus;
    SELECT * FROM Room;
    SELECT * FROM Section;
    SELECT * FROM Course;
    SELECT * FROM Course_Section;
    SELECT * FROM Schedule;
END $$

DELIMITER ;