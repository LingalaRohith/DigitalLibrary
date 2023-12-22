-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: dbms_bookstore1
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_type` (
  `account_type_id` int NOT NULL AUTO_INCREMENT,
  `account_type` enum('ADMIN','CUSTOMER') DEFAULT NULL,
  PRIMARY KEY (`account_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_type`
--

LOCK TABLES `account_type` WRITE;
/*!40000 ALTER TABLE `account_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_inventory`
--

DROP TABLE IF EXISTS `book_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `Book_Id` int NOT NULL,
  `quantity` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `bookId_idx` (`Book_Id`),
  CONSTRAINT `bookId` FOREIGN KEY (`Book_Id`) REFERENCES `books` (`Book_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_inventory`
--

LOCK TABLES `book_inventory` WRITE;
/*!40000 ALTER TABLE `book_inventory` DISABLE KEYS */;
INSERT INTO `book_inventory` VALUES (1,1,47,'Active',25.99),(2,2,33,'Active',15.79),(3,3,24,'Active',12.99),(4,4,67,'Active',20),(5,5,38,'Active',18),(6,6,17,'Active',17.29),(7,7,28,'Active',15.49),(8,8,46,'Active',30),(9,9,28,'Active',15),(10,10,23,'Active',10.99),(11,11,12,'Active',12.99),(12,12,10,'Active',20),(13,13,4,'Active',20),(14,14,0,'Active',21),(15,15,2,'Active',30.49),(16,16,9,'Active',24),(17,17,10,'Active',22.99),(18,18,19,'Active',29),(19,19,31,'Active',25),(20,20,21,'Active',19),(21,21,41,'Active',29),(22,22,22,'Active',30),(23,23,12,'Active',29),(24,24,11,'Active',33),(25,25,26,'Active',27.59),(26,26,17,'Active',28),(27,27,15,'Active',15),(28,28,6,'Active',30),(29,29,5,'Active',17.99),(30,30,8,'Active',29),(31,31,7,'Active',15.99),(32,32,5,'Active',30.99),(33,33,4,'Active',52);
/*!40000 ALTER TABLE `book_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `Book_Id` int NOT NULL AUTO_INCREMENT,
  `isbn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `publisher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `publication_year` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `edition` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buying_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_general_ci,
  `image_data` longtext COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`Book_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'125030170X','The Silent Patient','Alex Michaelides','Mystery, Thriller & Suspense','Celadon Books','2019','2',17.99,25.99,50,'The Silent Patient is a shocking psychological thriller of a woman’s act of violence against her husband―and of the\n therapist obsessed with uncovering her motive.','https://m.media-amazon.com/images/I/41bsvxNUSdL._SX327_BO1,204,203,200_.jpg\n'),(2,'1837901325','The Housemaid\'s Secret','Freida McFadden','Mystery, Thriller & Suspense','Grand Central Publishing ','2023','1',13.79,15.79,34,'“Don’t go in the guest bedroom.” A shadow falls on Douglas Garrick’s face as he touches the door with his fingertips. “My wife… she’s very ill.” As he continues showing me their incredible penthouse apartment, I have a terrible feeling about the woman behind closed doors. But I can’t risk losing this job—not if I want to keep my da\nrkest secret safe…','https://m.media-amazon.com/images/I/41HzWKGkRoL._SX322_BO1,204,203,200_.jpg\n'),(3,'1538742578','The Housemaid ','Freida McFadden','Mystery, Thriller & Suspense','Grand Central Publishing ','2022','2',10.99,12.99,24,'Don\'t miss the New York Times and USA Today bestseller and addictive psychological thriller with a jaw-dropping twist that’s burning up Instagram and TikTok--Freida McFadden’s The Housemaid is perfect for fans of Ruth Ware, Lisa Jewell, and Verity.','https://m.media-amazon.com/images/I/41zWWzbiHpL._SX331_BO1,204,203,200_.jpg\n'),(4,'1957635010','Hunting Adeline (Cat and Mouse Duet)','H. D. Carlton ','Mystery, Thriller & Suspense','H. D. Carlton','2022','3',17,20,67,'The conclusion to the Cat and Mouse Duet is here...','https://m.media-amazon.com/images/I/513FhHEEsCL._SX322_BO1,204,203,200_.jpg'),(5,'1501154656','Then She Was Gone','Lisa Jewell ','Mystery, Thriller & Suspense','Atria; Reprint edition','2018','3',15,18,38,'Invisible Girl and The Truth About Melody Browne comes a “riveting” (PopSugar) and “acutely observed family drama” (People) that delves into the lingering aftermath of a young girl’s disappearance.','https://m.media-amazon.com/images/I/51tcCg6W6ZL._SX320_BO1,204,203,200_.jpg'),(6,'1501171356','The Last Thing He Told Me','Laura Dave ','Mystery, Thriller & Suspense','Marysue Rucci Books','2022','2',13.29,17.29,17,'Perfect summer reading! Don’t miss the #1 New York Times bestselling blockbuster and Reese Witherspoon Book Club Pick that’s sold over 2 million copies–now an Apple TV+ limited series starring Jennifer Garner!\nThe “page-turning, exhilarating” (PopSugar) and “heartfelt thriller” (Real Simple) about a woman who thinks she’s found the love of her life—until he disappears.','https://m.media-amazon.com/images/I/415-49lX6HL._SX326_BO1,204,203,200_.jpg'),(7,'1503905128','The Perfect Child','Lucinda Berry ','Mystery, Thriller & Suspense','Thomas & Mercer','2019','1',11.49,15.49,28,'A page-turning debut of suspense about a young couple desperate to have a child of their own―and the unsettling consequences of getting what they always wanted.\n','https://m.media-amazon.com/images/I/41igFeTDplL._SX331_BO1,204,203,200_.jpg'),(8,'60598247','The Chronicles of Narnia','C.S. Lewis, Pauline Baynes','Fantasy ','HarperCollins Narnia','2004','2',25,30,46,'An impressive hardcover volume containing all seven books in the classic fantasy series The Chronicles of Narnia, graced by black-and-white chapter opening illustrations and featuring an essay by C. S. Lewis on writing. This volume also contains C. S. Lewis\'s essay \"\"On Three Ways of Writing for Children.\"\"\nFantastic creatures, heroic deeds, epic battles in the war between good and evil, and unforgettable adventures come together in this world where magic meets reality, which has been enchanting readers of all ages for over sixty years. The Chronicles of Narnia has transcended the fantasy genre to become a part of the canon of classic literature.\nThis edition presents all seven books—The Magician\'s Nephew; The Lion, the Witch and the Wardrobe; The Horse and His Boy; Prince Caspian; The Voyage of the Dawn Treader; The Silver Chair; and The Last Battle—unabridged. The books appear according to C. S. Lewis\'s preferred order and each chapter features a chapter opening illustration by the original artist, Pauline Baynes.','https://m.media-amazon.com/images/I/51p1WxfBJAL._SX329_BO1,204,203,200_.jpg'),(9,'1503904911','Where the Forest Meets the Stars','Glendy Vanderah ','Fantasy ','Lake Union Publishing','2019','1',12,15,31,'In this gorgeously stunning debut, a mysterious child teaches two strangers how to love and trust again.\nAfter the loss of her mother and her own battle with breast cancer, Joanna Teale returns to her graduate research on nesting birds in rural Illinois, determined to prove that her recent hardships have not broken her. She throws herself into her work from dusk to dawn, until her solitary routine is disrupted by the appearance of a mysterious child who shows up at her cabin barefoot and covered in bruises.\nThe girl calls herself Ursa, and she claims to have been sent from the stars to witness five miracles. With concerns about the child’s home situation, Jo reluctantly agrees to let her stay―just until she learns more about Ursa’s past.\nJo enlists the help of her reclusive neighbor, Gabriel Nash, to solve the mystery of the charming child. But the more time they spend together, the more questions they have. How does a young girl not only read but understand Shakespeare? Why do good things keep happening in her presence? And why aren’t Jo and Gabe checking the missing children’s website anymore?\nThough the three have formed an incredible bond, they know difficult choices must be made. As the summer nears an end and Ursa gets closer to her fifth miracle, her dangerous past closes in. When it finally catches up to them, all of their painful secrets will be forced into the open, and their fates will be left to the stars.','https://m.media-amazon.com/images/I/51sZRlFOe6L._SX331_BO1,204,203,200_.jpg'),(10,'545582881','Harry Potter and the Sorcerer\'s Stone','J. K. Rowling','Fantasy ','Scholastic','1997','1',6.99,10.99,23,'Harry Potter has no idea how famous he is. That\'s because he\'s being raised by his miserable aunt and uncle who are terrified Harry will learn that he\'s really a wizard, just as his parents were. But everything changes when Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright. From the surprising way he is greeted by a lovable giant, to the unique curriculum and colorful faculty at his unusual school, Harry finds himself drawn deep inside a mystical world he never knew existed and closer to his own noble destiny.','https://m.media-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg'),(11,'439064872','Harry Potter and the Chamber of Secrets','J. K. Rowling','Fantasy ','Scholastic','1998','2',9.79,12.99,12,'The Dursleys were so mean and hideous that summer that all Harry Potter wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he\'s packing his bags, Harry receives a warning from a strange, impish creature named Dobby who says that if Harry Potter returns to Hogwarts, disaster will strike.\nAnd strike it does. For in Harry\'s second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor, Gilderoy Lockhart, a spirit named Moaning Myrtle who haunts the girls\' bathroom, and the unwanted attentions of Ron Weasley\'s younger sister, Ginny.','https://m.media-amazon.com/images/I/51auVPOrgTL._SX342_BO1,204,203,200_.jpg'),(12,'439136350','Harry Potter and the Prisoner of Azkaban','J. K. Rowling','Fantasy ','Scholastic','1999','1',15,20,10,'For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black. Convicted of killing thirteen people with a single curse, he was said to be the heir apparent to the Dark Lord, Voldemort.Now he has escaped, leaving only two clues as to where he might be headed: Harry Potter\'s defeat of You-Know-Who was Black\'s downfall as well. And the Azkaban guards heard Black muttering in his sleep, \"He\'s at Hogwarts . . . he\'s at Hogwarts.\"Harry Potter isn\'t safe, not even within the walls of his magical school, surrounded by his friends. Because on top of it all, there may well be a traitor in their midst.','https://m.media-amazon.com/images/I/51-rbiAIiRL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'),(13,'1338878956','Harry Potter and the Goblet of Fire','J. K. Rowling','Fantasy ','Scholastic','2000','3',16,20,4,'If I knew what the book was about I would surely tell you. Alas, Ms. Rowling keeps her stories a mystery, even to her editor, until she\'s ready to turn in a manuscript!','https://m.media-amazon.com/images/I/51gy+g8Z+1L._SY344_BO1,204,203,200_.jpg'),(14,'9780439358064','Harry Potter and the Order of the Phoenix','J. K. Rowling','Fantasy ','Scholastic','2003','3',16,21,5,'The next volume in the thrilling, moving, bestselling Harry Potter series will reach readers June 21, 2003 -- and it\'s been worth the wait!\nWe could tell you, but then we\'d have to Obliviate your memory.','https://m.media-amazon.com/images/I/516c41oodRL._SX437_BO1,204,203,200_.jpg'),(15,'439784549','Harry Potter and the Half-Blood Prince','J. K. Rowling','Fantasy ','Scholastic','2005','2',12.49,30.49,8,'As the Harry Potter sequence draws to a close, Harry\'s most dangerous adventure yet is just beginning . . . and it starts July 16, 2005.\nWe could tell you, but then we\'d have to Obliviate your memory.','https://m.media-amazon.com/images/I/51uO1pQc5oL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'),(16,'545139708','Harry Potter and the Deathly Hallows','J. K. Rowling','Fantasy ','Scholastic','2007','1',16,24,9,'The magnificent final book in J. K. Rowling\'s seven-part saga comes to readers July 21, 2007.\n','https://m.media-amazon.com/images/I/51E7NvVLO9L._SX346_BO1,204,203,200_.jpg'),(17,'1949759229','The Mountain Is You',' Brianna Wiest','Motivational','Thought Catalog Books','2020','2',13.99,22.99,16,'This is a book about self-sabotage. Why we do it, when we do it, and how to stop doing it—for good. Coexisting but conflicting needs create self-sabotaging behaviors. This is why we resist efforts to change, often until they feel completely futile. But by extracting crucial insight from our most damaging habits, building emotional intelligence by better understanding our brains and bodies, releasing past experiences at a cellular level, and learning to act as our highest potential future selves, we can step out of our own way and into our potential. For centuries, the mountain has been used as a metaphor for the big challenges we face, especially ones that seem impossible to overcome. To scale our mountains, we actually have to do the deep internal work of excavating trauma, building resilience, and adjusting how we show up for the climb. In the end, it is not the mountain we master, but ourselves.','https://m.media-amazon.com/images/I/41N62t+ANTL._SX331_BO1,204,203,200_.jpg'),(18,'1544534078','Never Finished',' David Goggins','Motivational','Lioncrest Publishing','2023','3',19,29,19,'Esto no es un libro de autoayuda. ¡Es una llamada de atención! No me puedes lastimar, el gran éxito autobiográfico de David Goggins, demostró cuánta capacidad sin explotar todos tenemos, pero fue apenas una introducción al poder de la mente. En Nunca terminar, Goggins te lleva al interior de su Laboratorio Mental, donde desarrolló la filosofía, psicología y estrategias que le permitieron descubrir que aquello que consideraba su límite era tan sólo el punto de partida y que la búsqueda por la grandeza no tiene fin. Los relatos y lecciones en estas honestas, reveladoras e inquebrantables memorias ofrecen al lector un modelo a seguir para ascender desde el fondo del barril hasta una estratósfera completamente nueva que antes parecía inalcanzable. Si sientes que has perdido el rumbo en la vida, o estás buscando maximizar tu potencial o drenar tu alma para romper tu llamado techo de cristal, este es el único libro que necesitarás.','https://m.media-amazon.com/images/I/41hoPOs5mnL._SX331_BO1,204,203,200_.jpg'),(19,'757316425','The Undefeated Mind','Dr. Alex Lickerman MD','Motivational','Health Communications Inc','2012','1',17,25,31,'Legions of self-help authors rightly urge personal development as the key to happiness, but they typically fail to focus on its most important objective: hardiness. Though that which doesn\'t kill us can make us stronger, as Nietzsche tells us, few authors today offer any insight into just how to springboard from adversity to strength.\n\nIt doesn\'t just happen automatically; it takes practice. New scientific research suggests that resilience isn\'t something with which only a fortunate few of us have been born, but rather something we can all take specific','https://m.media-amazon.com/images/I/51EnOwoxxdL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'),(20,'9788173711466','Wings of fire',' A. P. J. Abdul Kalam,  Arun Tiwari','Motivational','Universities Press,India','2006','2',13,19,21,'APJ Abdul Kalam\'s autobiography depicts an extraordinary life: a child born into a little-educated family of boat-owners in Rameswaram-, a small pilgrim town in Tamilnadu, who grew up to lead India\'s space research and missile development programmes and emerged as one of the most important scientist-leaders of our time. Wings of Fire is a powerful story of courage and belief, as much an individual journey as the saga of independent India\'s search for scientific and technological self-sufficiency. This simplified and abridged version now makes Dr Kalam\'s inspirational story accessible to all readers. A comprehensive glossary provides help in the understanding of technical terms.','https://m.media-amazon.com/images/I/31TH7H+SXsL._BO1,204,203,200_.jpg'),(21,'143130722','Ikigai','Héctor García ,Francesc Miralles','Motivational','Penguin Life','2017','3',22,29,41,'“Workers looking for more fulfilling positions should start by identifying their ikigai.” ―Business Insider\n “One of the unintended—yet positive—consequences of the [pandemic] is that it is forcing people to reevaluate their jobs, careers, and lives. Use this time wisely, find your personal ikigai, and live your best life.” ―Forbes\nFind your ikigai (pronounced ee-key-guy) to live longer and bring more meaning and joy to all your days.\n“Only staying active will make you want to live a hundred years.” —Japanese proverb\n','https://m.media-amazon.com/images/I/41mtUoTi8ZL._SX351_BO1,204,203,200_.jpg'),(22,'1590035003','The Book of Awakening','Mark Nepo','Motivational','Red Wheel','2020','1',22,30,22,'A new edition of the #1 NYT’s bestseller by Mark Nepo, who has been called “one of the finest spiritual guides of our time” and “a consummate storyteller.”\n\nPhilosopher-poet and cancer survivor Mark Nepo opens a new season of freedom and joy―an escape from deadening, asleep-at-the wheel sameness―that is both profound and clarifying.\n','https://m.media-amazon.com/images/I/417h2o9gfeL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'),(23,'62457721','The Subtle Art of Not Giving a F*ck','Mark Manson ','Motivational','Gneric','2012','2',15,29,12,'In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be positive all the time so that we can truly become better, happier people. \n\nFor decades we\'ve been told that positive thinking is the key to a happy, rich life. \"\"F*ck positivity,\"\" Mark Manson says. \"\"Let\'s be honest, shit is f*cked, and we have to live with it.\"\" In his wildly popular Internet blog, Manson doesn\'t sugarcoat or equivocate. He tells it like it is - a dose of raw, refreshing, honest truth that is sorely lacking today. The Subtle Art of Not Giving a F*ck is his antidote to the coddling, let\'s-all-feel-good mind-set that has infected modern society and spoiled a generation, rewarding them with gold medals just for showing up. \n','https://m.media-amazon.com/images/I/51MT0MbpD7L.jpg'),(24,'1501110365','It Ends with Us','Colleen Hoover','Drama','Atria Books','2016','3',19,33,11,'In this “brave and heartbreaking novel that digs its claws into you and doesn’t let go, long after you’ve finished it” (Anna Todd, New York Times bestselling author) from the #1 New York Times bestselling author of All Your Perfects, a workaholic with a too-good-to-be-true romance can’t stop thinking about her first love.\n','https://m.media-amazon.com/images/I/51Zu0ZwT0jL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'),(25,'1476776881','Maybe in Another Life','Taylor Jenkins Reid','Drama','Washington Square Press','2015','1',16.59,27.59,26,'A People Magazine Pick * US Weekly “Must” Pick * Named “Best Book of the Summer” by Glamour * Good Housekeeping * USA TODAY * Cosmopolitan * PopSugar * Working Mother * Bustle * Goodreads\nA breathtaking new novel about a young woman whose fate hinges on the choice she makes after bumping into an old flame; in alternating chapters, we see two possible scenarios unfold—with stunningly different results.\n','https://m.media-amazon.com/images/I/41wZ4ZQVKKL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'),(26,'593336828','The Love Hypothesis','Ali Hazelwood','Drama','Muza','2022','2',16,28,17,'A BuzzFeed Best Summer Read of 2021\nWhen a fake relationship between scientists meets the irresistible force of attraction, it throws one woman\'s carefully calculated theories on love into chaos.\nAs a third-year Ph.D. candidate, Olive Smith doesn\'t believe in lasting romantic relationships--but her best friend does, and that\'s what got her into this situation. Convincing Anh that Olive is dating and well on her way to a happily ever after was always going to take more than hand-wavy Jedi mind tricks: Scientists require proof. So, like any self-respecting biologist, Olive panics and kisses the first man she sees.\nThat man is none other than Adam Carlsen, a young hotshot professor--and well-known ass. Which is why Olive is positively floored when Stanford\'s reigning lab tyrant agrees to keep her charade a secret and be her fake boyfriend. But when a big science conference goes haywire, putting Olive\'s career on the Bunsen burner, Adam surprises her again with his unyielding support and even more unyielding...six-pack abs.\nSuddenly their little experiment feels dangerously close to combustion. And Olive discovers that the only thing more complicated than a hypothesis on love is putting her own heart under the microscope.','https://m.media-amazon.com/images/I/51GgppWtGRL._SX331_BO1,204,203,200_.jpg'),(27,'62918060','The Upside of Falling','Alex Light','Drama','HarperTeen','2012','3',11,15,15,'A fun, flirty teen debut from Wattpad phenom Alex Light about a fake relationship and real love. Perfect for Jenny Han fans.\nIt’s been years since seventeen-year-old Becca Hart believed in true love. But when her former best friend teases her for not having had a boyfriend, Becca impulsively pretends she’s been secretly seeing someone.\nBrett Wells has it all. As captain of the football team and one of the most popular guys in his school, he should have no problem finding someone to date, but he’s always been more focused on his future than who to bring to prom.\nWhen he overhears Becca’s lie, Brett decides to step in and be the mystery guy. It’s the perfect solution: he gets people off his back for not having a meaningful relationship and she can keep up the ruse that she’s got a boyfriend.\nActing like the perfect couple isn’t easy, though, especially when you barely know the other person. But with Becca still picking up the pieces from when her world was blown apart years ago and Brett just barely holding his together now, they begin to realize they have more in common than they ever could have imagined.\nWhen the line between what is pretend and what is real begins to blur, they\'re forced to answer the question: Is this fake romance the realest thing in either of their lives?\n','https://m.media-amazon.com/images/I/418e4p4UDYL._SX329_BO1,204,203,200_.jpg'),(28,'63304937','You Will Own Nothing','Carol Roth','Drama','Broadside Books','2023','1',25,30,6,'The New York Times bestselling author and entrepreneur investigates what would happen if a new financial world order took hold, one in which global elites own everything and you own nothing—and yet you are somehow happy.\nWhen Carol Roth first heard that one of the World Economic Forum’s predictions for 2030 was “You will own nothing, and be happy,” she thought it was an outlandish fantasy. Then, she researched it. What she found was that a number of businesses, governments, and global elites share a vision of a future that sounds utopian: Everyone will have everything they need, and no one will own anything.\nFrom declines in home and vehicle ownership to global inflation and government spending, many of the trends of modern life reveal that a new world that is emerging—one in which Western citizens, by choice or by circumstance, increasingly do not own possessions or accumulate wealth. It’s the perfect economic environment for the rich and powerful to solidify their positions and prevent anyone else from getting ahead.\nIn You Will Own Nothing¸ Roth reveals how the agendas of Wall Street, world governments, international organizations, socialist activists, and multinational corporations like Blackrock all work together to reduce the power of the dollar and prevent millions of Americans from taking control of their wealth. She shows why owning fewer assets makes you poorer and less free. This book is essential guide to protecting your hard-earned wealth for the coming generations.','https://m.media-amazon.com/images/I/517hhsHINKL._SX327_BO1,204,203,200_.jpg'),(29,'979-8853282377','One Last Rainy Day','Kate Stewart','Drama',' Independently published','2023','1',15,17.99,5,'“My rainy days are yours, Dominic. If you want them.”\nOnce upon a time…\nThere lived a man with a vengeance-filled heart that held too many secrets.\nAnd a woman, pure of soul, intent on uncovering them.\nWhat they failed to realize is that through the storm their love would create…\na legacy would be born.\nOne Last Rainy Day: The Legacy of a Prince is a spin off of The Ravenhood Series, and the first installment of the Ravenhood Legacy series.\n','https://m.media-amazon.com/images/I/51sI+ll8IAL._SX322_BO1,204,203,200_.jpg'),(30,'1400334365','Like a River','Granger Smith','Motivational','Thomas Nelson','2023','1',26,29,8,'Like a River, a triumphant story of new life birthed out of tragedy, will teach readers how to face their failures, confront their pain, and connect with God—the true source of life.\nOn June 4th, 2019, country music singer Granger Smith was enjoying a final evening with his kids before heading to Nashville for the CMT Music Awards and his next tour. While helping his daughter London with her gymnastics, his youngest son fell into their pool. Granger did everything he could to get to him, but he was too late. River drowned, and Granger\'s world shattered.\nThe days, weeks, and months that followed River\'s death sent Granger on a dark and painful journey. Every time he closed his eyes, he replayed the horrific event in his mind, and every time he opened his computer, he was bombarded by the critique and criticism of people who blamed him for the accident.\nDespite his best effort to get back on stage with a smile and song, it was all a façade. On the inside he was dying. Fortunately, that\'s not how his story ended. And now he is compelled to help people all around the world find strength, peace, and hope on the other side of tragedy.','https://m.media-amazon.com/images/I/41HCw3rzbzL._SX331_BO1,204,203,200_.jpg'),(31,'1638930961','The Butcher and the Wren','Alaina Urquhart','Mystery, Thriller & Suspense','Zando','2023','1',12,15.99,7,'From the co-host of chart-topping true crime podcast Morbid, a thrilling debut novel told from the dueling perspectives of a notorious serial killer and the medical examiner following where his trail of victims leads\nSomething dark is lurking in the Louisiana bayou: a methodical killer with a penchant for medical experimentation is hard at work completing his most harrowing crime yet, taunting the authorities who desperately try to catch up.\nBut forensic pathologist Dr. Wren Muller is the best there is. Armed with an encyclopedic knowledge of historical crimes, and years of experience working in the Medical Examiner\'s office, she\'s never encountered a case she couldn\'t solve. Until now. Case after case is piling up on Wren\'s examination table, and soon she is sucked into an all-consuming cat-and-mouse chase with a brutal murderer getting more brazen by the day.\nAn addictive read with straight-from-the-morgue details only an autopsy technician could provide, The Butcher and the Wren promises to ensnare all who enter.\nNow with an exclusive sneak peek at the highly anticipated sequel!','https://m.media-amazon.com/images/I/51+jVsRPy5L._SX331_BO1,204,203,200_.jpg'),(32,'1271727212','Unbroken Bonds of Battle','SSGT Johnny Joey Jones','Mystery, Thriller & Suspense','Broadside Books','2023','1',26,30.99,5,'Life only really starts when we start serving others.\nFor many people, military service isn’t simply a job. It’s a ticket out of a lonely society and into a family of enduring bonds.\nIn over a decade of working with veterans, Johnny Joey Jones has discovered the power of battle-forged friendships. Suffering a life-changing injury while deployed in Afghanistan, he faced a daunting recovery. But coming home would have been much harder without the support of his brothers and sisters in arms.\nIn Unbroken Bonds of Battle, Joey tells the stories of those very warriors, who for years have supported and inspired him on the battlefield and off. Through unfiltered and authentic conversations with American heroes in every branch of service, Joey tackles the big questions about life, loss, and, of course, hunting.\nPowerful life lessons are woven throughout these personal oral histories. Also included is a scrapbook of beautiful candid photographs from the lives of these modern warriors.\nA gorgeous patriotic keepsake, Unbroken Bonds of Battle reminds us of the costs paid by those who defend our freedom through unvarnished, inspiring tales of friendship.','https://m.media-amazon.com/images/I/51MXUznlr6L._SX329_BO1,204,203,200_.jpg'),(33,'17489652312','House of Roots','Houstain','Drama','Zaxin','2021','5',25,52,4,'Despite dreams of adventures far beyond the Salann shores','https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&set=key%5Bresolve.format%5D,value%5Bwebp%5D&source=url%5Bhttps://prodimage.images-bn.com/pimages/9780593708347_p0_v2_s600x595.jpg%5D&scale=options%5Blimit%5D,size%5B300x10000%5D&sink=format%5Bwebp%5D');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_books`
--

DROP TABLE IF EXISTS `cart_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_books` (
  `Cart_Book_ID` int NOT NULL AUTO_INCREMENT,
  `Cart_Id` int NOT NULL,
  `Book_Id` int NOT NULL,
  `Quantity` int DEFAULT NULL,
  `price` double NOT NULL,
  `User_Id` int DEFAULT NULL,
  PRIMARY KEY (`Cart_Book_ID`),
  KEY `fk_book` (`Book_Id`),
  KEY `fk_cart` (`Cart_Id`),
  KEY `fk_user_idx` (`User_Id`),
  CONSTRAINT `fk_book` FOREIGN KEY (`Book_Id`) REFERENCES `books` (`Book_Id`),
  CONSTRAINT `fk_cart` FOREIGN KEY (`Cart_Id`) REFERENCES `shopping_cart` (`Cart_Id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`User_Id`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_books`
--

LOCK TABLES `cart_books` WRITE;
/*!40000 ALTER TABLE `cart_books` DISABLE KEYS */;
INSERT INTO `cart_books` VALUES (43,1,14,1,21,46),(47,4,1,2,25.99,53),(48,4,6,1,17.29,53),(49,5,1,2,25.99,54),(50,5,2,2,15.79,54),(51,5,6,1,17.29,54);
/*!40000 ALTER TABLE `cart_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `Order_Id` int NOT NULL AUTO_INCREMENT,
  `User_Id` int DEFAULT NULL,
  `order_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `total_amount` float NOT NULL,
  `Address_Id` int DEFAULT NULL,
  `Payment_Id` int DEFAULT NULL,
  `order_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `confirmation_email_sent` bit(1) NOT NULL,
  `Confirmation_Number` int NOT NULL,
  `Promo_Code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`Order_Id`),
  KEY `orders_ibfk_1` (`User_Id`),
  KEY `fk_promo_Code` (`Promo_Code`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,46,'07/28/2023',221.787,9,12,'Order Placed',_binary '',90226720,NULL),(2,46,'07/28/2023',92.682,9,11,'Order Placed',_binary '',91616296,NULL),(3,51,'07/29/2023',71.372,12,16,'Order Placed',_binary '',99863601,NULL),(4,52,'07/31/2023',45,14,18,'Order Placed',_binary '',84801184,NULL),(5,52,'07/31/2023',45,14,18,'Order Placed',_binary '',29059692,NULL),(6,55,'11/26/2023',20,18,22,'Order Placed',_binary '',95037585,NULL),(7,55,'11/26/2023',20,18,22,'Order Placed',_binary '',75846702,NULL),(8,55,'11/26/2023',20,18,22,'Order Placed',_binary '',77915925,NULL),(9,55,'11/26/2023',15.79,18,22,'Order Placed',_binary '',97503008,NULL),(10,55,'11/26/2023',15.79,18,22,'Order Placed',_binary '',53323814,NULL),(11,55,'11/26/2023',77.97,18,22,'Order Placed',_binary '',94563217,NULL),(12,55,'11/26/2023',77.97,18,22,'Order Placed',_binary '',86120224,NULL),(13,55,'11/26/2023',77.97,18,22,'Order Placed',_binary '',39661715,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_cards`
--

DROP TABLE IF EXISTS `payment_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_cards` (
  `Payment_Id` int NOT NULL AUTO_INCREMENT,
  `card_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_holder` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `User_ID` int DEFAULT NULL,
  `exp_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`Payment_Id`),
  KEY `paymentcards_ibfk_1` (`User_ID`),
  CONSTRAINT `fk_cards_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_cards`
--

LOCK TABLES `payment_cards` WRITE;
/*!40000 ALTER TABLE `payment_cards` DISABLE KEYS */;
INSERT INTO `payment_cards` VALUES (11,'ejyN6IaGdfglhfoTb4R2Ow==','Revanth','credit',46,'03/2024'),(12,'DrPwg7cVRYZrdTZLux4l0g==','Revanth','credit',46,'03/2025'),(14,'cHKVyihfPNTiEHt2fO1Gng==','ERehewh','credit',46,'02/2024'),(15,'9HkekYoD6LUhA8VSZcAeUw==','','',51,'/'),(16,'3MtEo5dVQduss8kWoyD6HQ==','lokesh','credit',51,'04/2030'),(17,'9HkekYoD6LUhA8VSZcAeUw==','','',52,'/'),(18,'TGmlKFBuz6UZXAUFhPCj6g==','murali','credit',52,'01/2026'),(19,'9HkekYoD6LUhA8VSZcAeUw==','','',53,'/'),(20,'9HkekYoD6LUhA8VSZcAeUw==','','',54,'/'),(21,'9HkekYoD6LUhA8VSZcAeUw==','','',55,'/'),(22,'xZ8pp7oAZMAr+Ols3bg8Pg==','chaiatys','credit',55,'02/2028');
/*!40000 ALTER TABLE `payment_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_address`
--

DROP TABLE IF EXISTS `shipping_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_address` (
  `Address_Id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zip_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `User_ID` int DEFAULT NULL,
  PRIMARY KEY (`Address_Id`),
  KEY `shippingaddress_ibfk_1_idx` (`User_ID`),
  CONSTRAINT `shippingaddress_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_address`
--

LOCK TABLES `shipping_address` WRITE;
/*!40000 ALTER TABLE `shipping_address` DISABLE KEYS */;
INSERT INTO `shipping_address` VALUES (4,'12233','Athens','Georgia','30605',47),(5,'734 preston woods trail sandy springs','Atlanta','Georgia','30338',47),(7,'1000 lakeside drive','Athens','Iowa','30605',49),(8,'734preston','Atlanta','Georgia','30338',50),(9,'1000 lakeside Dr','Athen','GA','30605',46),(10,'1000drive','Athens','Georgia','30338',46),(11,'','','','',51),(12,'K.p nagar','vijayawada','Ap','21365',51),(13,'','','','',52),(14,'vijayawada','andhra','Tamilnadu','789545',52),(15,'','','','',53),(16,'','','','',54),(17,'','','','',55),(18,'495  s','athens','ga','30605',55);
/*!40000 ALTER TABLE `shipping_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `Cart_Id` int NOT NULL AUTO_INCREMENT,
  `User_Id` int DEFAULT NULL,
  PRIMARY KEY (`Cart_Id`),
  KEY `shoppingcart_ibfk_1` (`User_Id`),
  CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (1,46),(2,51),(3,52),(4,53),(5,54),(6,55);
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `User_ID` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_type_id` enum('ADMIN','CUSTOMER') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Mobile_Number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `otp_code` int NOT NULL,
  `accept_promotion` bit(1) DEFAULT NULL,
  `subscribe_to_promo` tinyint(1) DEFAULT '0',
  `account_status_id` int NOT NULL,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (55,'L','Rohith','$2a$10$a31LeLTHNQ5wLCywhehZ7ev3JycF33nKDDbb1Em828qqDPu3tzfFW','rhthlingala@gmail.com','CUSTOMER','7894561210',115931,NULL,0,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-26 23:44:36
