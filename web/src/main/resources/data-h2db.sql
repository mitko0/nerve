insert into roles(role_name) values ('ADMIN'), ('USER');

insert into users(id, username, password, role_id, profile_picture) values
(-1, 'public_user', '$2a$10$NrleRwrwV3dTDq9N7mTKnuntWtoU6332twy9tWou4XQslk2B8RPjq', 1, '/profilePics/default.jpg'), --6483
(1, 'admin', '$2a$10$NrleRwrwV3dTDq9N7mTKnuntWtoU6332twy9tWou4XQslk2B8RPjq', 1, '/profilePics/admin.jpg'), --6483
(2, 'user', '$2a$10$NrleRwrwV3dTDq9N7mTKnuntWtoU6332twy9tWou4XQslk2B8RPjq', 2, '/profilePics/default.jpg'); --6483

insert into challenges(sender_id, receiver_id, description_, responded, create_date, end_date, version_) values
(1, -1, 'challenge 1', 0, current_timestamp(3), current_timestamp(3) + 1, current_timestamp(3)),
(1, -1, 'challenge 2', 0, current_timestamp(3) - 0.05, current_timestamp(3) + 1, current_timestamp(3) - 0.05),
(1, -1, 'challenge 3', 0, current_timestamp(3) - 0.1, current_timestamp(3) + 1, current_timestamp(3) - 0.1),
(2, -1, 'challenge 4', 0, current_timestamp(3) - 0.15, current_timestamp(3) + 1, current_timestamp(3) - 0.15),
(2, -1, 'challenge 5', 0, current_timestamp(3) - 0.2, current_timestamp(3) + 1, current_timestamp(3) - 0.2),
(1, -1, 'challenge 6', 0, current_timestamp(3) - 0.25, current_timestamp(3) + 1, current_timestamp(3) - 0.25),
(1, -1, 'challenge 7', 0, current_timestamp(3) - 0.3, current_timestamp(3) + 1, current_timestamp(3) - 0.3),
(2, -1, 'challenge 8', 0, current_timestamp(3) - 0.35, current_timestamp(3) + 1, current_timestamp(3) - 0.35),
(2, -1, 'challenge 9', 0, current_timestamp(3) - 0.4, current_timestamp(3) + 1, current_timestamp(3) - 0.4),
(2, -1, 'challenge 10', 0, current_timestamp(3) - 0.45, current_timestamp(3) + 1, current_timestamp(3) - 0.45),
(2, -1, 'challenge 11', 0, current_timestamp(3) - 0.5, current_timestamp(3) + 1, current_timestamp(3) - 0.5),
(2, 1, 'from user to admin', 0, current_timestamp(3), current_timestamp(3) + 1, current_timestamp(3)),
(1, 2, 'from admin to user', 0, current_timestamp(3), current_timestamp(3) + 1, current_timestamp(3));

insert into streaks values (1, 2, current_timestamp(3) + 0.02, 5, current_timestamp(3) + 1);
