USE capstone_db;


INSERT INTO dogs (description, dob, img, loveable, dog_name, sex, weight, user_id, age)
VALUES ('Really great dog, I like it a lot.', current_time, 'test/test', false, 'Buddy', 'F', 10, (SELECT id FROM users LIMIT 1), 20);


INSERT INTO dogs (description, dob, img, loveable, dog_name, sex, weight, user_id, age)
VALUES ('A dog, he likes to run', current_time, 'test/test', false, 'Jeffery', 'M', 15, (SELECT id FROM users LIMIT 1), 10);

INSERT INTO dogs (description, dob, img, loveable, dog_name, sex, weight, user_id, age)
VALUES ('small dog, love em...', current_time, 'test/test', true, 'BAILEY', 'F', 5, (SELECT id FROM users LIMIT 1), 12);

INSERT INTO dogs (description, dob, img, loveable, dog_name, sex, weight, user_id, age)
VALUES ('I love this dog so much basically he is great, awesome, etc.', current_time, 'test/test', true, 'George', 'M', 5, (SELECT id FROM users LIMIT 1), 20)





