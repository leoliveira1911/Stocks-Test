--Create table

create table expenses (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(45) NOT NULL,
    deadline VARCHAR(45),
    value DECIMAL(6,2) NOT NULL,
    user VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
) ;

--npm fu

INSERT INTO expenses (name, type, deadline, value, user)
VALUES( 'academia', 'saude', '15/09' , 100.90 , 'LeoOliveira');
VALUES( 'lanche', 'alimentação', '15/09' , 55.40 , 'LeoOliveira');


SELECT name, type, value, user, deadline, id FROM expenses;