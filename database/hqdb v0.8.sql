-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 16, 2012 at 03:18 AM
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
(1, '2012-11-16', 'PENDING');

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
(1, 1111, 0, 1000, 1500, 'NORMAL'),
(1, 11521340, 10, 21.8, 2415, 'DISCONTINUED'),
(1, 11760294, 10, 82.4, 3065, 'DISCONTINUED'),
(1, 12008016, 10, 32.05, 100, 'DISCONTINUED'),
(1, 13523279, 10, 85.5, 100, 'DISCONTINUED'),
(1, 15521955, 10, 95.45, 1180, 'DISCONTINUED'),
(1, 16543556, 10, 3.45, 3840, 'DISCONTINUED'),
(1, 16686549, 10, 97.25, 3845, 'DISCONTINUED'),
(1, 16948044, 10, 34.25, 100, 'DISCONTINUED'),
(1, 18121244, 10, 41.5, 2925, 'DISCONTINUED'),
(1, 18164847, 10, 79.3, 160, 'DISCONTINUED'),
(1, 18175970, 10, 85.05, 100, 'DISCONTINUED'),
(1, 18243337, 10, 60.05, 2035, 'DISCONTINUED'),
(1, 19619262, 10, 86.65, 890, 'DISCONTINUED'),
(1, 20151308, 10, 20.65, 380, 'DISCONTINUED'),
(1, 20219909, 10, 42.5, 3660, 'DISCONTINUED'),
(1, 20909394, 10, 27.95, 1690, 'DISCONTINUED'),
(1, 21884433, 10, 22.85, 100, 'DISCONTINUED'),
(1, 22016225, 10, 55.8, 4230, 'DISCONTINUED'),
(1, 23946308, 10, 94, 1785, 'DISCONTINUED'),
(1, 24067314, 10, 90.85, 1885, 'DISCONTINUED'),
(1, 24768324, 10, 10.4, 100, 'DISCONTINUED'),
(1, 26264360, 10, 45.7, 2370, 'DISCONTINUED'),
(1, 26653184, 10, 29.2, 100, 'DISCONTINUED'),
(1, 27693372, 10, 65.4, 4755, 'DISCONTINUED'),
(1, 28127291, 10, 86.4, 1565, 'DISCONTINUED'),
(1, 28323264, 10, 44.9, 3510, 'DISCONTINUED'),
(1, 28366167, 10, 98.05, 100, 'DISCONTINUED'),
(1, 30011470, 10, 31.55, 100, 'DISCONTINUED'),
(1, 30300675, 10, 51.5, 4400, 'DISCONTINUED'),
(1, 30364600, 10, 70.15, 1275, 'DISCONTINUED'),
(1, 31129261, 10, 71.65, 100, 'DISCONTINUED'),
(1, 31555897, 10, 61, 100, 'DISCONTINUED'),
(1, 32592458, 10, 97.35, 4435, 'DISCONTINUED'),
(1, 32703379, 10, 53.15, 100, 'DISCONTINUED'),
(1, 33188933, 10, 40.85, 100, 'DISCONTINUED'),
(1, 33464262, 10, 85.25, 100, 'DISCONTINUED'),
(1, 33491310, 10, 37.85, 100, 'DISCONTINUED'),
(1, 34571368, 10, 78.3, 2690, 'DISCONTINUED'),
(1, 34994031, 10, 51.4, 100, 'DISCONTINUED'),
(1, 35412528, 10, 56.65, 100, 'DISCONTINUED'),
(1, 35653240, 10, 68.4, 100, 'DISCONTINUED'),
(1, 35760875, 10, 14.45, 100, 'DISCONTINUED'),
(1, 36002736, 10, 24.05, 100, 'DISCONTINUED'),
(1, 36092718, 10, 56.6, 2815, 'DISCONTINUED'),
(1, 36795157, 10, 80.6, 1675, 'DISCONTINUED'),
(1, 37676915, 10, 78.95, 2135, 'DISCONTINUED'),
(1, 38004786, 10, 90.15, 3010, 'DISCONTINUED'),
(1, 40098529, 10, 83.45, 990, 'DISCONTINUED'),
(1, 40155785, 10, 41.8, 1290, 'DISCONTINUED'),
(1, 40443390, 10, 33.85, 100, 'DISCONTINUED'),
(1, 40924160, 10, 45.6, 100, 'DISCONTINUED'),
(1, 41660339, 10, 30.2, 100, 'DISCONTINUED'),
(1, 43741253, 10, 30, 4405, 'DISCONTINUED'),
(1, 46547386, 10, 82.65, 4370, 'DISCONTINUED'),
(1, 47974430, 10, 35.4, 4045, 'DISCONTINUED'),
(1, 50148962, 10, 46.35, 895, 'DISCONTINUED'),
(1, 51312536, 10, 40.35, 1350, 'DISCONTINUED'),
(1, 51336619, 10, 36.05, 1895, 'DISCONTINUED'),
(1, 51808477, 10, 47.1, 1710, 'DISCONTINUED'),
(1, 52240015, 10, 1.25, 680, 'DISCONTINUED'),
(1, 54053173, 10, 37.9, 100, 'DISCONTINUED'),
(1, 54528680, 10, 83.5, 2465, 'DISCONTINUED'),
(1, 55659812, 10, 46.3, 100, 'DISCONTINUED'),
(1, 56208845, 10, 96.3, 100, 'DISCONTINUED'),
(1, 59030623, 10, 26.85, 2625, 'DISCONTINUED'),
(1, 61187597, 10, 9.95, 3155, 'DISCONTINUED'),
(1, 63502056, 10, 74.8, 100, 'DISCONTINUED'),
(1, 64677697, 10, 4.75, 100, 'DISCONTINUED'),
(1, 65201080, 10, 92.5, 1250, 'DISCONTINUED'),
(1, 65871735, 10, 71.25, 760, 'DISCONTINUED'),
(1, 66752080, 10, 93.8, 1215, 'DISCONTINUED'),
(1, 66765410, 10, 18.4, 220, 'DISCONTINUED'),
(1, 67531375, 10, 21.15, 100, 'DISCONTINUED'),
(1, 67775131, 10, 82.9, 100, 'DISCONTINUED'),
(1, 67859788, 10, 14.45, 2800, 'DISCONTINUED'),
(1, 68508930, 10, 65.3, 100, 'DISCONTINUED'),
(1, 69693583, 10, 57.6, 3205, 'DISCONTINUED'),
(1, 70525778, 10, 87.45, 100, 'DISCONTINUED'),
(1, 75506105, 10, 66.65, 100, 'DISCONTINUED'),
(1, 76409993, 10, 96.15, 1010, 'DISCONTINUED'),
(1, 77464010, 10, 86.25, 780, 'DISCONTINUED'),
(1, 78107011, 10, 52.25, 100, 'DISCONTINUED'),
(1, 79951082, 10, 7.55, 100, 'DISCONTINUED'),
(1, 80796672, 10, 80.6, 100, 'DISCONTINUED'),
(1, 81856054, 10, 19.7, 815, 'DISCONTINUED'),
(1, 81889450, 10, 64.85, 100, 'DISCONTINUED'),
(1, 82129140, 10, 36.75, 100, 'DISCONTINUED'),
(1, 83024065, 10, 63.2, 295, 'DISCONTINUED'),
(1, 83829674, 10, 71.25, 4020, 'DISCONTINUED'),
(1, 83920592, 10, 65.7, 100, 'DISCONTINUED'),
(1, 86377180, 10, 18.15, 2670, 'DISCONTINUED'),
(1, 86747844, 10, 38.3, 2645, 'DISCONTINUED'),
(1, 88491799, 10, 94.35, 655, 'DISCONTINUED'),
(1, 88723081, 10, 4.15, 100, 'DISCONTINUED'),
(1, 90114604, 10, 2.75, 100, 'DISCONTINUED'),
(1, 90359597, 10, 85.45, 100, 'DISCONTINUED'),
(1, 90713781, 10, 90.65, 3850, 'DISCONTINUED'),
(1, 91000270, 10, 66.45, 2140, 'DISCONTINUED'),
(1, 93404773, 10, 6.2, 100, 'DISCONTINUED'),
(1, 93719528, 10, 23.05, 830, 'DISCONTINUED'),
(2, 1111, 1111, 100, 11, 'DISCONTINUE');

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
(1, '2012-11-16', 1111, 3000, 0),
(1, '2012-11-16', 11521340, 4830, 0),
(1, '2012-11-16', 11760294, 6130, 0),
(1, '2012-11-16', 12008016, 200, 0),
(1, '2012-11-16', 13523279, 200, 0),
(1, '2012-11-16', 15521955, 2360, 0),
(1, '2012-11-16', 16543556, 7680, 0),
(1, '2012-11-16', 16686549, 7690, 0),
(1, '2012-11-16', 16948044, 200, 0),
(1, '2012-11-16', 18121244, 5850, 0),
(1, '2012-11-16', 18164847, 320, 0),
(1, '2012-11-16', 18175970, 200, 0),
(1, '2012-11-16', 18243337, 4070, 0),
(1, '2012-11-16', 19619262, 1780, 0),
(1, '2012-11-16', 20151308, 760, 0),
(1, '2012-11-16', 20219909, 7320, 0),
(1, '2012-11-16', 20909394, 3380, 0),
(1, '2012-11-16', 21884433, 200, 0),
(1, '2012-11-16', 22016225, 8460, 0),
(1, '2012-11-16', 23946308, 3570, 0),
(1, '2012-11-16', 24067314, 3770, 0),
(1, '2012-11-16', 24768324, 200, 0),
(1, '2012-11-16', 26264360, 4740, 0),
(1, '2012-11-16', 26653184, 200, 0),
(1, '2012-11-16', 27693372, 9510, 0),
(1, '2012-11-16', 28127291, 3130, 0),
(1, '2012-11-16', 28323264, 7020, 0),
(1, '2012-11-16', 28366167, 200, 0),
(1, '2012-11-16', 30011470, 200, 0),
(1, '2012-11-16', 30300675, 8800, 0),
(1, '2012-11-16', 30364600, 2550, 0),
(1, '2012-11-16', 31129261, 200, 0),
(1, '2012-11-16', 31555897, 200, 0),
(1, '2012-11-16', 32592458, 8870, 0),
(1, '2012-11-16', 32703379, 200, 0),
(1, '2012-11-16', 33188933, 200, 0),
(1, '2012-11-16', 33464262, 200, 0),
(1, '2012-11-16', 33491310, 200, 0),
(1, '2012-11-16', 34571368, 5380, 0),
(1, '2012-11-16', 34994031, 200, 0),
(1, '2012-11-16', 35412528, 200, 0),
(1, '2012-11-16', 35653240, 200, 0),
(1, '2012-11-16', 35760875, 200, 0),
(1, '2012-11-16', 36002736, 200, 0),
(1, '2012-11-16', 36092718, 5630, 0),
(1, '2012-11-16', 36795157, 3350, 0),
(1, '2012-11-16', 37676915, 4270, 0),
(1, '2012-11-16', 38004786, 6020, 0),
(1, '2012-11-16', 40098529, 1980, 0),
(1, '2012-11-16', 40155785, 2580, 0),
(1, '2012-11-16', 40443390, 200, 0),
(1, '2012-11-16', 40924160, 200, 0),
(1, '2012-11-16', 41660339, 200, 0),
(1, '2012-11-16', 43741253, 8810, 0),
(1, '2012-11-16', 46547386, 8740, 0),
(1, '2012-11-16', 47974430, 8090, 0),
(1, '2012-11-16', 50148962, 1790, 0),
(1, '2012-11-16', 51312536, 2700, 0),
(1, '2012-11-16', 51336619, 3790, 0),
(1, '2012-11-16', 51808477, 3420, 0),
(1, '2012-11-16', 52240015, 1360, 0),
(1, '2012-11-16', 54053173, 200, 0),
(1, '2012-11-16', 54528680, 4930, 0),
(1, '2012-11-16', 55659812, 200, 0),
(1, '2012-11-16', 56208845, 200, 0),
(1, '2012-11-16', 59030623, 5250, 0),
(1, '2012-11-16', 61187597, 6310, 0),
(1, '2012-11-16', 63502056, 200, 0),
(1, '2012-11-16', 64677697, 200, 0),
(1, '2012-11-16', 65201080, 2500, 0),
(1, '2012-11-16', 65871735, 1520, 0),
(1, '2012-11-16', 66752080, 2430, 0),
(1, '2012-11-16', 66765410, 440, 0),
(1, '2012-11-16', 67531375, 200, 0),
(1, '2012-11-16', 67775131, 200, 0),
(1, '2012-11-16', 67859788, 5600, 0),
(1, '2012-11-16', 68508930, 200, 0),
(1, '2012-11-16', 69693583, 6410, 0),
(1, '2012-11-16', 70525778, 200, 0),
(1, '2012-11-16', 75506105, 200, 0),
(1, '2012-11-16', 76409993, 2020, 0),
(1, '2012-11-16', 77464010, 1560, 0),
(1, '2012-11-16', 78107011, 200, 0),
(1, '2012-11-16', 79951082, 200, 0),
(1, '2012-11-16', 80796672, 200, 0),
(1, '2012-11-16', 81856054, 1630, 0),
(1, '2012-11-16', 81889450, 200, 0),
(1, '2012-11-16', 82129140, 200, 0),
(1, '2012-11-16', 83024065, 590, 0),
(1, '2012-11-16', 83829674, 8040, 0),
(1, '2012-11-16', 83920592, 200, 0),
(1, '2012-11-16', 86377180, 5340, 0),
(1, '2012-11-16', 86747844, 5290, 0),
(1, '2012-11-16', 88491799, 1310, 0),
(1, '2012-11-16', 88723081, 200, 0),
(1, '2012-11-16', 90114604, 200, 0),
(1, '2012-11-16', 90359597, 200, 0),
(1, '2012-11-16', 90713781, 7700, 0),
(1, '2012-11-16', 91000270, 4280, 0),
(1, '2012-11-16', 93404773, 200, 0),
(1, '2012-11-16', 93719528, 1660, 0);

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
(1, 132, 1111, '2012-11-13'),
(2, 122, 1111, '2012-11-13');

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
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`product_barcode`) REFERENCES `product` (`barcode`),
  ADD CONSTRAINT `inventory_ibfk_3` FOREIGN KEY (`outlet_id`) REFERENCES `outlet` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `request_details`
--
ALTER TABLE `request_details`
  ADD CONSTRAINT `request_details_ibfk_3` FOREIGN KEY (`outlet_id`) REFERENCES `batch_request` (`outlet_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `request_details_ibfk_4` FOREIGN KEY (`barcode`) REFERENCES `inventory` (`product_barcode`) ON DELETE CASCADE;

--
-- Constraints for table `revenue`
--
ALTER TABLE `revenue`
  ADD CONSTRAINT `revenue_ibfk_1` FOREIGN KEY (`outlet_id`) REFERENCES `inventory` (`outlet_id`);
