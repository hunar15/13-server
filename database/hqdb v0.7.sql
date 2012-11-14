-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 14, 2012 at 06:33 AM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hqdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `batch_request`
--

CREATE TABLE IF NOT EXISTS `batch_request` (
  `outlet_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(15) NOT NULL,
  PRIMARY KEY (`outlet_id`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `batch_request`
--

INSERT INTO `batch_request` (`outlet_id`, `date`, `status`) VALUES
(1, '2012-11-13', 'COMPLETED');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE IF NOT EXISTS `inventory` (
  `outlet_id` int(11) NOT NULL,
  `product_barcode` int(20) NOT NULL,
  `stock` int(11) NOT NULL,
  `selling_price` double NOT NULL,
  `min_stock` int(11) NOT NULL,
  `status` varchar(15) NOT NULL,
  PRIMARY KEY (`outlet_id`,`product_barcode`),
  KEY `product_barcode` (`product_barcode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`outlet_id`, `product_barcode`, `stock`, `selling_price`, `min_stock`, `status`) VALUES
(1, 1111, 111, 122, 1, 'NORMAL'),
(1, 11521340, 3315, 21.7999992370605, 2415, 'NORMAL'),
(1, 11760294, 4715, 82.4000015258789, 3065, 'NORMAL'),
(1, 12008016, 1975, 32.0499992370605, 100, 'NORMAL'),
(1, 13523279, 2905, 85.5, 100, 'NORMAL'),
(1, 15521955, 3680, 95.4499969482422, 1180, 'NORMAL'),
(1, 16543556, 4740, 3.45000004768372, 3840, 'NORMAL'),
(1, 16686549, 4545, 97.25, 3845, 'NORMAL'),
(1, 16948044, 590, 34.25, 100, 'NORMAL'),
(1, 18121244, 4775, 41.5, 2925, 'NORMAL'),
(1, 18164847, 2560, 79.3000030517578, 160, 'NORMAL'),
(1, 18175970, 1380, 85.0500030517578, 100, 'NORMAL'),
(1, 18243337, 5385, 60.0499992370605, 2035, 'NORMAL'),
(1, 19619262, 4340, 86.6500015258789, 890, 'NORMAL'),
(1, 20151308, 1980, 20.6499996185303, 380, 'NORMAL'),
(1, 20219909, 4410, 42.5, 3660, 'NORMAL'),
(1, 20909394, 4540, 27.9500007629395, 1690, 'NORMAL'),
(1, 21884433, 1050, 22.8500003814697, 100, 'NORMAL'),
(1, 22016225, 4930, 55.7999992370605, 4230, 'NORMAL'),
(1, 23946308, 2035, 94, 1785, 'NORMAL'),
(1, 24067314, 5085, 90.8499984741211, 1885, 'NORMAL'),
(1, 24768324, 1695, 10.3999996185303, 100, 'NORMAL'),
(1, 26264360, 4520, 45.7000007629395, 2370, 'NORMAL'),
(1, 26653184, 1865, 29.2000007629395, 100, 'NORMAL'),
(1, 27693372, 5155, 65.4000015258789, 4755, 'NORMAL'),
(1, 28127291, 2515, 86.4000015258789, 1565, 'NORMAL'),
(1, 28323264, 5360, 44.9000015258789, 3510, 'NORMAL'),
(1, 28366167, 815, 98.0500030517578, 100, 'NORMAL'),
(1, 30011470, 1300, 31.5499992370605, 100, 'NORMAL'),
(1, 30300675, 5300, 51.5, 4400, 'NORMAL'),
(1, 30364600, 2275, 70.1500015258789, 1275, 'NORMAL'),
(1, 31129261, 1295, 71.6500015258789, 100, 'NORMAL'),
(1, 31555897, 820, 61, 100, 'NORMAL'),
(1, 32592458, 5335, 97.3499984741211, 4435, 'NORMAL'),
(1, 32703379, 3665, 53.1500015258789, 100, 'NORMAL'),
(1, 33188933, 1215, 40.8499984741211, 100, 'NORMAL'),
(1, 33464262, 3300, 85.25, 100, 'NORMAL'),
(1, 33491310, 575, 37.8499984741211, 100, 'NORMAL'),
(1, 34571368, 4640, 78.3000030517578, 2690, 'NORMAL'),
(1, 34994031, 1390, 51.4000015258789, 100, 'NORMAL'),
(1, 35412528, 4350, 56.6500015258789, 100, 'NORMAL'),
(1, 35653240, 2310, 68.4000015258789, 100, 'NORMAL'),
(1, 35760875, 2610, 14.4499998092651, 100, 'NORMAL'),
(1, 36002736, 4310, 24.0499992370605, 100, 'NORMAL'),
(1, 36092718, 4015, 56.5999984741211, 2815, 'NORMAL'),
(1, 36795157, 3225, 80.5999984741211, 1675, 'NORMAL'),
(1, 37676915, 4835, 78.9499969482422, 2135, 'NORMAL'),
(1, 38004786, 5410, 90.1500015258789, 3010, 'NORMAL'),
(1, 40098529, 4490, 83.4499969482422, 990, 'NORMAL'),
(1, 40155785, 1990, 41.7999992370605, 1290, 'NORMAL'),
(1, 40443390, 3425, 33.8499984741211, 100, 'NORMAL'),
(1, 40924160, 1525, 45.5999984741211, 100, 'NORMAL'),
(1, 41660339, 2430, 30.2000007629395, 100, 'NORMAL'),
(1, 43741253, 5155, 30, 4405, 'NORMAL'),
(1, 46547386, 4920, 82.6500015258789, 4370, 'NORMAL'),
(1, 47974430, 4895, 35.4000015258789, 4045, 'NORMAL'),
(1, 50148962, 1495, 46.3499984741211, 895, 'NORMAL'),
(1, 51312536, 5200, 40.3499984741211, 1350, 'NORMAL'),
(1, 51336619, 3195, 36.0499992370605, 1895, 'NORMAL'),
(1, 51808477, 2810, 47.0999984741211, 1710, 'NORMAL'),
(1, 52240015, 4930, 1.25, 680, 'NORMAL'),
(1, 54053173, 655, 37.9000015258789, 100, 'NORMAL'),
(1, 54528680, 4065, 83.5, 2465, 'NORMAL'),
(1, 55659812, 1740, 46.2999992370605, 100, 'NORMAL'),
(1, 56208845, 1220, 96.3000030517578, 100, 'NORMAL'),
(1, 59030623, 3325, 26.8500003814697, 2625, 'NORMAL'),
(1, 61187597, 3605, 9.94999980926514, 3155, 'NORMAL'),
(1, 63502056, 965, 74.8000030517578, 100, 'NORMAL'),
(1, 64677697, 865, 4.75, 100, 'NORMAL'),
(1, 65201080, 2200, 92.5, 1250, 'NORMAL'),
(1, 65871735, 4460, 71.25, 760, 'NORMAL'),
(1, 66752080, 3315, 93.8000030517578, 1215, 'NORMAL'),
(1, 66765410, 920, 18.3999996185303, 220, 'NORMAL'),
(1, 67531375, 890, 21.1499996185303, 100, 'NORMAL'),
(1, 67775131, 3705, 82.9000015258789, 100, 'NORMAL'),
(1, 67859788, 5350, 14.4499998092651, 2800, 'NORMAL'),
(1, 68508930, 1460, 65.3000030517578, 100, 'NORMAL'),
(1, 69693583, 3355, 57.5999984741211, 3205, 'NORMAL'),
(1, 70525778, 1820, 87.4499969482422, 100, 'NORMAL'),
(1, 75506105, 2580, 66.6500015258789, 100, 'NORMAL'),
(1, 76409993, 1910, 96.1500015258789, 1010, 'NORMAL'),
(1, 77464010, 3330, 86.25, 780, 'NORMAL'),
(1, 78107011, 560, 52.25, 100, 'NORMAL'),
(1, 79951082, 4295, 7.55000019073486, 100, 'NORMAL'),
(1, 80796672, 1835, 80.5999984741211, 100, 'NORMAL'),
(1, 81856054, 1965, 19.7000007629395, 815, 'NORMAL'),
(1, 81889450, 1660, 64.8499984741211, 100, 'NORMAL'),
(1, 82129140, 2840, 36.75, 100, 'NORMAL'),
(1, 83024065, 1595, 63.2000007629395, 295, 'NORMAL'),
(1, 83829674, 4470, 71.25, 4020, 'NORMAL'),
(1, 83920592, 2540, 65.6999969482422, 100, 'NORMAL'),
(1, 86377180, 4020, 18.1499996185303, 2670, 'NORMAL'),
(1, 86747844, 3895, 38.2999992370605, 2645, 'NORMAL'),
(1, 88491799, 1205, 94.3499984741211, 655, 'NORMAL'),
(1, 88723081, 2925, 4.15000009536743, 100, 'NORMAL'),
(1, 90114604, 2905, 2.75, 100, 'NORMAL'),
(1, 90359597, 850, 85.4499969482422, 100, 'NORMAL'),
(1, 90713781, 4400, 90.6500015258789, 3850, 'NORMAL'),
(1, 91000270, 2290, 66.4499969482422, 2140, 'NORMAL'),
(1, 93404773, 2050, 6.19999980926514, 100, 'NORMAL'),
(1, 93719528, 3130, 23.0499992370605, 830, 'NORMAL');

-- --------------------------------------------------------

--
-- Table structure for table `outlet`
--

CREATE TABLE IF NOT EXISTS `outlet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(20) NOT NULL,
  `address` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `outlet`
--

INSERT INTO `outlet` (`id`, `s_name`, `address`) VALUES
(1, 'Hunar''s Shop', 'Singapore'),
(2, 'Sample', 'asdsa');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `name` varchar(150) NOT NULL,
  `category` varchar(100) NOT NULL,
  `barcode` int(11) NOT NULL,
  `cost_price` float NOT NULL,
  `manufacturer` varchar(30) NOT NULL,
  PRIMARY KEY (`barcode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`name`, `category`, `barcode`, `cost_price`, `manufacturer`) VALUES
('abc', 'abc', 1111, 12, 'aaa'),
('Money Clip', 'Breakfast Foods', 11521340, 21.8, '3315'),
('4 ink colour ball pen', 'Tobacco Papers', 11760294, 82.4, '4715'),
('Duffle cooler bag', 'Toys & Games', 12008016, 32.05, '1975'),
('Silver Round Zipper Tin', 'Gourmet Food', 13523279, 85.5, '2905'),
('ASSORTED COLOUR JELLY BEANS IN SCREW CAP JAR', 'Automotive', 15521955, 95.45, '3680'),
('ANTI STRESS SOCCER BALL', 'Bakery', 16543556, 3.45, '4740'),
('Non-woven shopper bag', 'Tools, Auto & Industrial', 16686549, 97.25, '4545'),
('Tape measure w/ carabiner hook.', 'Athletic & Outdoor Clothing', 16948044, 34.25, '590'),
('Bath Salts Bottle', 'Video On Demand', 18121244, 41.5, '4775'),
('Standard 12 inch (30cm) Balloons', 'Video Games', 18164847, 79.3, '2560'),
('Rectangular Keyring', 'MP3 Downloads', 18175970, 85.05, '1380'),
('Highlighter pen with memo pad', 'Grocery, Health & Beauty', 18243337, 60.05, '5385'),
('Sports Towel', 'Hair Removal', 19619262, 86.65, '4340'),
('Cotton Hatbands', 'Cell Phones & Service', 20151308, 20.65, '1980'),
('Techno Flash Drive 256MB', 'Bottle', 20219909, 42.5, '4410'),
('Ladies Aston Short Sleeve', 'Printers & Ink', 20909394, 27.95, '4540'),
('A4 Portfolio', 'Video Games for Kids', 21884433, 22.85, '1050'),
('Wired Backpack', 'Home & Garden', 22016225, 55.8, '4930'),
('Trend Wine Cooler', 'Industrial & Scientific', 23946308, 94, '2035'),
('Travel Clock', 'MP3 & Media Players', 24067314, 90.85, '5085'),
('CONTOUR BALLPOINT PEN ', 'Outdoor Power Equipment', 24768324, 10.4, '1695'),
('White paper shopping bag ', 'Team Sports', 26264360, 45.7, '4520'),
('Whistle Keyring', 'Accessories', 26653184, 29.2, '1865'),
('Blue ink ball pen ', 'Nursery', 27693372, 65.4, '5155'),
('Acrylic Beanie ', 'Guinness', 28127291, 86.4, '2515'),
('New Orleans Mug', 'Kindle DX', 28323264, 44.9, '5360'),
('Urban Sticky Note Holder', 'Training Pants', 28366167, 98.05, '815'),
('Goggles', 'Outdoor Recreation', 30011470, 31.55, '1300'),
('Mesh Sports Cap', 'Shower & Bath Products', 30300675, 51.5, '5300'),
('5 Panel Trucker Mesh Cap', 'Drinks', 30364600, 70.15, '2275'),
('Mulberry', 'Jewelry', 31129261, 71.65, '1295'),
('Pillow Pack', 'Kindle Store', 31555897, 61, '820'),
('A5 Eco Notepad', 'Liquor', 32592458, 97.35, '5335'),
('Hourglass with blue sand', 'Home Care', 32703379, 53.15, '3665'),
('White Lip Balm Pot', 'Seasonal', 33188933, 40.85, '1215'),
('Koeskin Zip Round Portfolio', 'Travel Wipes', 33464262, 85.25, '3300'),
('Two tone jute shopping bag', 'Bath Products', 33491310, 37.85, '575'),
('CLASSIC PAPER STRING STRAW HAT ', 'Golf', 34571368, 78.3, '4640'),
('Dill', 'Toys, Kids & Baby', 34994031, 51.4, '1390'),
('Fennel, Sweet', 'Boardgames', 35412528, 56.65, '4350'),
('Symphony Gold Top Pen', 'Shampoo', 35653240, 68.4, '2310'),
('Ball pen with rubber grip', 'Fan Shop', 35760875, 14.45, '2610'),
('A5 Leather Compendium', 'Health & Safety', 36002736, 24.05, '4310'),
('Silver Round Zipper Tin', 'Condiments & Dressings', 36092718, 56.6, '4015'),
('Metal ball pen', 'Nursery', 36795157, 80.6, '3225'),
('ROUND METAL CASE FLASHLIGHT KEYTAG ', 'Home & Garden', 37676915, 78.95, '4835'),
('Java Mini Mug', 'Grocery, Health & Beauty', 38004786, 90.15, '5410'),
('Mens Short Sleeve Metro Shirt ', 'Industrial & Scientific', 40098529, 83.45, '4490'),
('Vision Memo Set', 'Desktops & Servers', 40155785, 41.8, '1990'),
('BALL POINT PEN', 'Rice Pasta & Grains', 40443390, 33.85, '3425'),
('Pen and pencil set', 'Oil', 40924160, 45.6, '1525'),
('MEGA KLAPPER', 'Jewelry', 41660339, 30.2, '2430'),
('Aircraft Keyring', 'Accessories', 43741253, 30, '5155'),
('Piggy bank', 'Toys & Games', 46547386, 82.65, '4920'),
('HITME Ball pen with light bulb', 'Food', 47974430, 35.4, '4895'),
('Mini Cyber Brushes', 'All Sports & Outdoors', 50148962, 46.35, '1495'),
('Emergency raincoat hermetic bag', 'Toys, Kids & Baby', 51312536, 40.35, '5200'),
('A4 Leather Binder Retractable', 'Grocery, Health & Beauty', 51336619, 36.05, '3195'),
('Corniche 4 pcs shoulder picnic pack', 'Blu-ray', 51808477, 47.1, '2810'),
('20 pcs Small first aid kit', 'Blu-ray', 52240015, 1.25, '4930'),
('Aquatic ball set', 'Home Appliances', 54053173, 37.9, '655'),
('SIM Card Data Saver - with Phone Book', 'Magazines', 54528680, 83.5, '4065'),
('SOLIS - Y224 Engraved', 'Motorcycle & ATV', 55659812, 46.3, '1740'),
('Poly Cotton Bucket Hat', 'Health & Personal Care', 56208845, 96.3, '1220'),
('BHC Golf Visor With Magnetic Marker', 'Stop Smoking', 59030623, 26.85, '3325'),
('Business Card Holder', 'Musical Instruments', 61187597, 9.95, '3605'),
('12 colour pencil in tin box ', 'Musical Instruments', 63502056, 74.8, '965'),
('Concord', 'Team Sports', 64677697, 4.75, '865'),
('Map of Australia Keyring', 'Furniture & DÈcor', 65201080, 92.5, '2200'),
('Papaya', 'Seasonal', 65871735, 71.25, '4460'),
('Rock Rose', 'Ready To Drink', 66752080, 93.8, '3315'),
('WHITE MICROFIBRE LENS CLOTH', 'Grocery, Health & Beauty', 66765410, 18.4, '920'),
('Flash Sports Bag', 'Jewelry', 67531375, 21.15, '890'),
('LIGHT BULB PAPERCLIPS ON MAGNETIC BASE', 'Bath Products', 67775131, 82.9, '3705'),
('Wooden Mirror', 'Natural & Organic', 67859788, 14.45, '5350'),
('Outdoors Kit', 'Video Games', 68508930, 65.3, '1460'),
('First Aid kit in EVA', 'MP3 Downloads', 69693583, 57.6, '3355'),
('Tentacle USB Hub', 'Grocery', 70525778, 87.45, '1820'),
('Corporate Colour Mini Jelly Beans In 6cm Canister  ', 'Incontinence Supplies', 75506105, 66.65, '2580'),
('Optically Secure', 'Musical Instruments', 76409993, 96.15, '1910'),
('Metal twist ball pen', 'Wipes Refills', 77464010, 86.25, '3330'),
('BIG WAVE TRANSPARENT KEYTAG', 'Clothing & Accessories', 78107011, 52.25, '560'),
('Anti-stress football', 'Skin Care', 79951082, 7.55, '4295'),
('Clip it', 'Books, newspapers & more', 80796672, 80.6, '1835'),
('ERGO EXTRA', 'Accessories', 81856054, 19.7, '1965'),
('Cinnamon, Cassia', 'Health & Personal Care', 81889450, 64.85, '1660'),
('Transparent solar calculator', 'Personal Care', 82129140, 36.75, '2840'),
('Larkspur', 'MP3 Downloads', 83024065, 63.2, '1595'),
('Non woven Kit Bag', 'Digital Downloads', 83829674, 71.25, '4470'),
('Wine opener', 'Shoes', 83920592, 65.7, '2540'),
('SIM CARD BACKUP', 'Body Care', 86377180, 18.15, '4020'),
('Torch Tape Measure', 'Incontinence Supplies', 86747844, 38.3, '3895'),
('fluro whistle', 'Toiletries', 88491799, 94.35, '1205'),
('Vibe Pen', 'Video Games', 88723081, 4.15, '2925'),
('Stevia', 'Musical Instruments', 90114604, 2.75, '2905'),
('Double Wine Bottle Carrier', 'Fan Shop', 90359597, 85.45, '850'),
('Fabio VOIP Earphone and Microphone', 'Video On Demand', 90713781, 90.65, '4400'),
('Classic mechanical pencil', 'Vacuums & Storage', 91000270, 66.45, '2290'),
('Ultra Vista Ballpoint pen', 'Athletic & Outdoor Clothing', 93404773, 6.2, '2050'),
('Lemon Grass', 'Health & Personal Care', 93719528, 23.05, '3130');

-- --------------------------------------------------------

--
-- Table structure for table `request_details`
--

CREATE TABLE IF NOT EXISTS `request_details` (
  `outlet_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `barcode` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `received` tinyint(1) NOT NULL,
  PRIMARY KEY (`outlet_id`,`date`,`barcode`),
  KEY `barcode` (`barcode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request_details`
--

INSERT INTO `request_details` (`outlet_id`, `date`, `barcode`, `quantity`, `received`) VALUES
(1, '2012-11-13', 1111, 60, 1),
(1, '2012-11-13', 11521340, 3623, 1),
(1, '2012-11-13', 11760294, 4598, 1),
(1, '2012-11-13', 12008016, 150, 1),
(1, '2012-11-13', 13523279, 150, 1),
(1, '2012-11-13', 15521955, 1770, 1),
(1, '2012-11-13', 16543556, 5760, 1),
(1, '2012-11-13', 16686549, 5768, 1),
(1, '2012-11-13', 16948044, 150, 1),
(1, '2012-11-13', 18121244, 4388, 1),
(1, '2012-11-13', 18164847, 240, 1),
(1, '2012-11-13', 18175970, 150, 1),
(1, '2012-11-13', 18243337, 3053, 1),
(1, '2012-11-13', 19619262, 1335, 1),
(1, '2012-11-13', 20151308, 570, 1),
(1, '2012-11-13', 20219909, 5490, 1),
(1, '2012-11-13', 20909394, 2535, 1),
(1, '2012-11-13', 21884433, 150, 1),
(1, '2012-11-13', 22016225, 6345, 1),
(1, '2012-11-13', 23946308, 2678, 1),
(1, '2012-11-13', 24067314, 2828, 1),
(1, '2012-11-13', 24768324, 150, 1),
(1, '2012-11-13', 26264360, 3555, 1),
(1, '2012-11-13', 26653184, 150, 1),
(1, '2012-11-13', 27693372, 7133, 1),
(1, '2012-11-13', 28127291, 2348, 1),
(1, '2012-11-13', 28323264, 5265, 1),
(1, '2012-11-13', 28366167, 150, 1),
(1, '2012-11-13', 30011470, 150, 1),
(1, '2012-11-13', 30300675, 6600, 1),
(1, '2012-11-13', 30364600, 1913, 1),
(1, '2012-11-13', 31129261, 150, 1),
(1, '2012-11-13', 31555897, 150, 1),
(1, '2012-11-13', 32592458, 6653, 1),
(1, '2012-11-13', 32703379, 150, 1),
(1, '2012-11-13', 33188933, 150, 1),
(1, '2012-11-13', 33464262, 150, 1),
(1, '2012-11-13', 33491310, 150, 1),
(1, '2012-11-13', 34571368, 4035, 1),
(1, '2012-11-13', 34994031, 150, 1),
(1, '2012-11-13', 35412528, 150, 1),
(1, '2012-11-13', 35653240, 150, 1),
(1, '2012-11-13', 35760875, 150, 1),
(1, '2012-11-13', 36002736, 150, 1),
(1, '2012-11-13', 36092718, 4223, 1),
(1, '2012-11-13', 36795157, 2513, 1),
(1, '2012-11-13', 37676915, 3203, 1),
(1, '2012-11-13', 38004786, 4515, 1),
(1, '2012-11-13', 40098529, 1485, 1),
(1, '2012-11-13', 40155785, 1935, 1),
(1, '2012-11-13', 40443390, 150, 1),
(1, '2012-11-13', 40924160, 150, 1),
(1, '2012-11-13', 41660339, 150, 1),
(1, '2012-11-13', 43741253, 6608, 1),
(1, '2012-11-13', 46547386, 6555, 1),
(1, '2012-11-13', 47974430, 6068, 1),
(1, '2012-11-13', 50148962, 1343, 1),
(1, '2012-11-13', 51312536, 2025, 1),
(1, '2012-11-13', 51336619, 2843, 1),
(1, '2012-11-13', 51808477, 2565, 1),
(1, '2012-11-13', 52240015, 1020, 1),
(1, '2012-11-13', 54053173, 150, 1),
(1, '2012-11-13', 54528680, 3698, 1),
(1, '2012-11-13', 55659812, 150, 1),
(1, '2012-11-13', 56208845, 150, 1),
(1, '2012-11-13', 59030623, 3938, 1),
(1, '2012-11-13', 61187597, 4733, 1),
(1, '2012-11-13', 63502056, 150, 1),
(1, '2012-11-13', 64677697, 150, 1),
(1, '2012-11-13', 65201080, 1875, 1),
(1, '2012-11-13', 65871735, 1140, 1),
(1, '2012-11-13', 66752080, 1823, 1),
(1, '2012-11-13', 66765410, 330, 1),
(1, '2012-11-13', 67531375, 150, 1),
(1, '2012-11-13', 67775131, 150, 1),
(1, '2012-11-13', 67859788, 4200, 1),
(1, '2012-11-13', 68508930, 150, 1),
(1, '2012-11-13', 69693583, 4808, 1),
(1, '2012-11-13', 70525778, 150, 1),
(1, '2012-11-13', 75506105, 150, 1),
(1, '2012-11-13', 76409993, 1515, 1),
(1, '2012-11-13', 77464010, 1170, 1),
(1, '2012-11-13', 78107011, 150, 1),
(1, '2012-11-13', 79951082, 150, 1),
(1, '2012-11-13', 80796672, 150, 1),
(1, '2012-11-13', 81856054, 1223, 1),
(1, '2012-11-13', 81889450, 150, 1),
(1, '2012-11-13', 82129140, 150, 1),
(1, '2012-11-13', 83024065, 443, 1),
(1, '2012-11-13', 83829674, 6030, 1),
(1, '2012-11-13', 83920592, 150, 1),
(1, '2012-11-13', 86377180, 4005, 1),
(1, '2012-11-13', 86747844, 3968, 1),
(1, '2012-11-13', 88491799, 983, 1),
(1, '2012-11-13', 88723081, 150, 1),
(1, '2012-11-13', 90114604, 150, 1),
(1, '2012-11-13', 90359597, 150, 1),
(1, '2012-11-13', 90713781, 5775, 1),
(1, '2012-11-13', 91000270, 3210, 1),
(1, '2012-11-13', 93404773, 150, 1),
(1, '2012-11-13', 93719528, 1245, 1);

-- --------------------------------------------------------

--
-- Table structure for table `revenue`
--

CREATE TABLE IF NOT EXISTS `revenue` (
  `outlet_id` int(11) NOT NULL,
  `revenue` double NOT NULL,
  `barcode` int(20) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`outlet_id`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `revenue`
--

INSERT INTO `revenue` (`outlet_id`, `revenue`, `barcode`, `date`) VALUES
(1, 132, 1111, '2012-11-13');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `batch_request`
--
ALTER TABLE `batch_request`
  ADD CONSTRAINT `batch_request_ibfk_1` FOREIGN KEY (`outlet_id`) REFERENCES `outlet` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_3` FOREIGN KEY (`outlet_id`) REFERENCES `outlet` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`product_barcode`) REFERENCES `product` (`barcode`);

--
-- Constraints for table `request_details`
--
ALTER TABLE `request_details`
  ADD CONSTRAINT `request_details_ibfk_3` FOREIGN KEY (`outlet_id`) REFERENCES `batch_request` (`outlet_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `request_details_ibfk_2` FOREIGN KEY (`barcode`) REFERENCES `inventory` (`product_barcode`);

--
-- Constraints for table `revenue`
--
ALTER TABLE `revenue`
  ADD CONSTRAINT `revenue_ibfk_1` FOREIGN KEY (`outlet_id`) REFERENCES `inventory` (`outlet_id`);
