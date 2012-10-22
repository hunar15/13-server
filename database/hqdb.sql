-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 22, 2012 at 07:18 PM
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
-- Table structure for table `inventory`
--

CREATE TABLE IF NOT EXISTS `inventory` (
  `outlet_id` int(11) NOT NULL,
  `product_barcode` bigint(20) NOT NULL,
  `stock` int(11) NOT NULL,
  `selling_price` float NOT NULL,
  `min_stock` int(11) NOT NULL,
  PRIMARY KEY (`outlet_id`,`product_barcode`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`outlet_id`, `product_barcode`, `stock`, `selling_price`, `min_stock`) VALUES
(1, 51336619, 3195, 36.05, 1895),
(1, 83920592, 2540, 65.7, 100),
(1, 59030623, 3325, 26.85, 2625),
(1, 69693583, 3355, 57.6, 3205),
(1, 43741253, 5155, 30, 4405),
(1, 56208845, 1220, 96.3, 100),
(1, 18243337, 5385, 60.05, 2035),
(1, 90359597, 850, 85.45, 100),
(1, 40155785, 1990, 41.8, 1290),
(1, 24768324, 1695, 10.4, 100),
(1, 86377180, 4020, 18.15, 2670),
(1, 70525778, 1820, 87.45, 100),
(1, 18121244, 4775, 41.5, 2925),
(1, 35412528, 4350, 56.65, 100),
(1, 30364600, 2275, 70.15, 1275),
(1, 91000270, 2290, 66.45, 2140),
(1, 61187597, 3605, 9.95, 3155),
(1, 76409993, 1910, 96.15, 1010),
(1, 67531375, 890, 21.15, 100),
(1, 65871735, 4460, 71.25, 760),
(1, 93719528, 3130, 23.05, 830),
(1, 88491799, 1205, 94.35, 655),
(1, 18175970, 1380, 85.05, 100),
(1, 68508930, 1460, 65.3, 100),
(1, 54053173, 655, 37.9, 100),
(1, 79951082, 4295, 7.55, 100),
(1, 81856054, 1965, 19.7, 815),
(1, 86747844, 3895, 38.3, 2645),
(1, 36795157, 3225, 80.6, 1675),
(1, 18164847, 2560, 79.3, 160),
(1, 40443390, 3425, 33.85, 100),
(1, 20219909, 4410, 42.5, 3660),
(1, 80796672, 1835, 80.6, 100),
(1, 26264360, 4520, 45.7, 2370),
(1, 32592458, 5335, 97.35, 4435),
(1, 63502056, 965, 74.8, 100),
(1, 15521955, 3680, 95.45, 1180),
(1, 26653184, 1865, 29.2, 100),
(1, 33464262, 3300, 85.25, 100),
(1, 66752080, 3315, 93.8, 1215),
(1, 51808477, 2810, 47.1, 1710),
(1, 64677697, 865, 4.75, 100),
(1, 31129261, 1295, 71.65, 100),
(1, 27693372, 5155, 65.4, 4755),
(1, 40098529, 4490, 83.45, 990),
(1, 65201080, 2200, 92.5, 1250),
(1, 41660339, 2430, 30.2, 100),
(1, 93404773, 2050, 6.2, 100),
(1, 33491310, 575, 37.85, 100),
(1, 90114604, 2905, 2.75, 100),
(1, 23946308, 2035, 94, 1785),
(1, 11521340, 3315, 21.8, 2415),
(1, 38004786, 5410, 90.15, 3010),
(1, 36002736, 4310, 24.05, 100),
(1, 90713781, 4400, 90.65, 3850),
(1, 16543556, 4740, 3.45, 3840),
(1, 33188933, 1215, 40.85, 100),
(1, 67775131, 3705, 82.9, 100),
(1, 32703379, 3665, 53.15, 100),
(1, 82129140, 2840, 36.75, 100),
(1, 77464010, 3330, 86.25, 780),
(1, 50148962, 1495, 46.35, 895),
(1, 20151308, 1980, 20.65, 380),
(1, 35653240, 2310, 68.4, 100),
(1, 54528680, 4065, 83.5, 2465),
(1, 75506105, 2580, 66.65, 100),
(1, 78107011, 560, 52.25, 100),
(1, 51312536, 5200, 40.35, 1350),
(1, 34994031, 1390, 51.4, 100),
(1, 24067314, 5085, 90.85, 1885),
(1, 31555897, 820, 61, 100),
(1, 16686549, 4545, 97.25, 3845),
(1, 13523279, 2905, 85.5, 100),
(1, 35760875, 2610, 14.45, 100),
(1, 47974430, 4895, 35.4, 4045),
(1, 46547386, 4920, 82.65, 4370),
(1, 30011470, 1300, 31.55, 100),
(1, 83829674, 4470, 71.25, 4020),
(1, 19619262, 4340, 86.65, 890),
(1, 28127291, 2515, 86.4, 1565),
(1, 55659812, 1740, 46.3, 100),
(1, 52240015, 4930, 1.25, 680),
(1, 12008016, 1975, 32.05, 100),
(1, 30300675, 5300, 51.5, 4400),
(1, 28366167, 815, 98.05, 100),
(1, 36092718, 4015, 56.6, 2815),
(1, 22016225, 4930, 55.8, 4230),
(1, 20909394, 4540, 27.95, 1690),
(1, 40924160, 1525, 45.6, 100),
(1, 28323264, 5360, 44.9, 3510),
(1, 11760294, 4715, 82.4, 3065),
(1, 88723081, 2925, 4.15, 100),
(1, 83024065, 1595, 63.2, 295),
(1, 66765410, 920, 18.4, 220),
(1, 34571368, 4640, 78.3, 2690),
(1, 16948044, 590, 34.25, 100),
(1, 37676915, 4835, 78.95, 2135),
(1, 81889450, 1660, 64.85, 100),
(1, 21884433, 1050, 22.85, 100),
(1, 67859788, 5350, 14.45, 2800);

-- --------------------------------------------------------

--
-- Table structure for table `outlet`
--

CREATE TABLE IF NOT EXISTS `outlet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(20) NOT NULL,
  `address` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `outlet`
--

INSERT INTO `outlet` (`id`, `s_name`, `address`) VALUES
(1, 'new outlet', 'random');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `name` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `barcode` bigint(20) NOT NULL,
  `cost_price` float NOT NULL,
  `manufacturer` varchar(30) NOT NULL,
  PRIMARY KEY (`barcode`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`name`, `category`, `barcode`, `cost_price`, `manufacturer`) VALUES
('A4 Leather Binder Retractable', 'Grocery, Health & Beauty', 51336619, 36.05, '3195'),
('Wine opener', 'Shoes', 83920592, 65.7, '2540'),
('BHC Golf Visor With Magnetic Marker', 'Stop Smoking', 59030623, 26.85, '3325'),
('First Aid kit in EVA', 'MP3 Downloads', 69693583, 57.6, '3355'),
('Aircraft Keyring', 'Accessories', 43741253, 30, '5155'),
('Poly Cotton Bucket Hat', 'Health & Personal Care', 56208845, 96.3, '1220'),
('Highlighter pen with memo pad', 'Grocery, Health & Beauty', 18243337, 60.05, '5385'),
('Double Wine Bottle Carrier', 'Fan Shop', 90359597, 85.45, '850'),
('Vision Memo Set', 'Desktops & Servers', 40155785, 41.8, '1990'),
('CONTOUR BALLPOINT PEN ', 'Outdoor Power Equipment', 24768324, 10.4, '1695'),
('SIM CARD BACKUP', 'Body Care', 86377180, 18.15, '4020'),
('Tentacle USB Hub', 'Grocery', 70525778, 87.45, '1820'),
('Bath Salts Bottle', 'Video On Demand', 18121244, 41.5, '4775'),
('Fennel, Sweet', 'Boardgames', 35412528, 56.65, '4350'),
('5 Panel Trucker Mesh Cap', 'Drinks', 30364600, 70.15, '2275'),
('Classic mechanical pencil', 'Vacuums & Storage', 91000270, 66.45, '2290'),
('Business Card Holder', 'Musical Instruments', 61187597, 9.95, '3605'),
('Optically Secure', 'Musical Instruments', 76409993, 96.15, '1910'),
('Flash Sports Bag', 'Jewelry', 67531375, 21.15, '890'),
('Papaya', 'Seasonal', 65871735, 71.25, '4460'),
('Lemon Grass', 'Health & Personal Care', 93719528, 23.05, '3130'),
('fluro whistle', 'Toiletries', 88491799, 94.35, '1205'),
('Rectangular Keyring', 'MP3 Downloads', 18175970, 85.05, '1380'),
('Outdoors Kit', 'Video Games', 68508930, 65.3, '1460'),
('Aquatic ball set', 'Home Appliances', 54053173, 37.9, '655'),
('Anti-stress football', 'Skin Care', 79951082, 7.55, '4295'),
('ERGO EXTRA', 'Accessories', 81856054, 19.7, '1965'),
('Torch Tape Measure', 'Incontinence Supplies', 86747844, 38.3, '3895'),
('Metal ball pen', 'Nursery', 36795157, 80.6, '3225'),
('Standard 12 inch (30cm) Balloons', 'Video Games', 18164847, 79.3, '2560'),
('BALL POINT PEN', 'Rice Pasta & Grains', 40443390, 33.85, '3425'),
('Techno Flash Drive 256MB', 'Bottle', 20219909, 42.5, '4410'),
('Clip it', 'Books, newspapers & more', 80796672, 80.6, '1835'),
('White paper shopping bag ', 'Team Sports', 26264360, 45.7, '4520'),
('A5 Eco Notepad', 'Liquor', 32592458, 97.35, '5335'),
('12 colour pencil in tin box ', 'Musical Instruments', 63502056, 74.8, '965'),
('ASSORTED COLOUR JELLY BEANS IN SCREW CAP JAR', 'Automotive', 15521955, 95.45, '3680'),
('Whistle Keyring', 'Accessories', 26653184, 29.2, '1865'),
('Koeskin Zip Round Portfolio', 'Travel Wipes', 33464262, 85.25, '3300'),
('Rock Rose', 'Ready To Drink', 66752080, 93.8, '3315'),
('Corniche 4 pcs shoulder picnic pack', 'Blu-ray', 51808477, 47.1, '2810'),
('Concord', 'Team Sports', 64677697, 4.75, '865'),
('Mulberry', 'Jewelry', 31129261, 71.65, '1295'),
('Blue ink ball pen ', 'Nursery', 27693372, 65.4, '5155'),
('Mens Short Sleeve Metro Shirt ', 'Industrial & Scientific', 40098529, 83.45, '4490'),
('Map of Australia Keyring', 'Furniture & DÈcor', 65201080, 92.5, '2200'),
('MEGA KLAPPER', 'Jewelry', 41660339, 30.2, '2430'),
('Ultra Vista Ballpoint pen', 'Athletic & Outdoor Clothing', 93404773, 6.2, '2050'),
('Two tone jute shopping bag', 'Bath Products', 33491310, 37.85, '575'),
('Stevia', 'Musical Instruments', 90114604, 2.75, '2905'),
('Trend Wine Cooler', 'Industrial & Scientific', 23946308, 94, '2035'),
('Money Clip', 'Breakfast Foods', 11521340, 21.8, '3315'),
('Java Mini Mug', 'Grocery, Health & Beauty', 38004786, 90.15, '5410'),
('A5 Leather Compendium', 'Health & Safety', 36002736, 24.05, '4310'),
('Fabio VOIP Earphone and Microphone', 'Video On Demand', 90713781, 90.65, '4400'),
('ANTI STRESS SOCCER BALL', 'Bakery', 16543556, 3.45, '4740'),
('White Lip Balm Pot', 'Seasonal', 33188933, 40.85, '1215'),
('LIGHT BULB PAPERCLIPS ON MAGNETIC BASE', 'Bath Products', 67775131, 82.9, '3705'),
('Hourglass with blue sand', 'Home Care', 32703379, 53.15, '3665'),
('Transparent solar calculator', 'Personal Care', 82129140, 36.75, '2840'),
('Metal twist ball pen', 'Wipes Refills', 77464010, 86.25, '3330'),
('Mini Cyber Brushes', 'All Sports & Outdoors', 50148962, 46.35, '1495'),
('Cotton Hatbands', 'Cell Phones & Service', 20151308, 20.65, '1980'),
('Symphony Gold Top Pen', 'Shampoo', 35653240, 68.4, '2310'),
('SIM Card Data Saver - with Phone Book', 'Magazines', 54528680, 83.5, '4065'),
('Corporate Colour Mini Jelly Beans In 6cm Canister ', 'Incontinence Supplies', 75506105, 66.65, '2580'),
('BIG WAVE TRANSPARENT KEYTAG', 'Clothing & Accessories', 78107011, 52.25, '560'),
('Emergency raincoat hermetic bag', 'Toys, Kids & Baby', 51312536, 40.35, '5200'),
('Dill', 'Toys, Kids & Baby', 34994031, 51.4, '1390'),
('Travel Clock', 'MP3 & Media Players', 24067314, 90.85, '5085'),
('Pillow Pack', 'Kindle Store', 31555897, 61, '820'),
('Non-woven shopper bag', 'Tools, Auto & Industrial', 16686549, 97.25, '4545'),
('Silver Round Zipper Tin', 'Gourmet Food', 13523279, 85.5, '2905'),
('Ball pen with rubber grip', 'Fan Shop', 35760875, 14.45, '2610'),
('HITME Ball pen with light bulb', 'Food', 47974430, 35.4, '4895'),
('Piggy bank', 'Toys & Games', 46547386, 82.65, '4920'),
('Goggles', 'Outdoor Recreation', 30011470, 31.55, '1300'),
('Non woven Kit Bag', 'Digital Downloads', 83829674, 71.25, '4470'),
('Sports Towel', 'Hair Removal', 19619262, 86.65, '4340'),
('Acrylic Beanie ', 'Guinness', 28127291, 86.4, '2515'),
('SOLIS - Y224 Engraved', 'Motorcycle & ATV', 55659812, 46.3, '1740'),
('20 pcs Small first aid kit', 'Blu-ray', 52240015, 1.25, '4930'),
('Duffle cooler bag', 'Toys & Games', 12008016, 32.05, '1975'),
('Mesh Sports Cap', 'Shower & Bath Products', 30300675, 51.5, '5300'),
('Urban Sticky Note Holder', 'Training Pants', 28366167, 98.05, '815'),
('Silver Round Zipper Tin', 'Condiments & Dressings', 36092718, 56.6, '4015'),
('Wired Backpack', 'Home & Garden', 22016225, 55.8, '4930'),
('Ladies Aston Short Sleeve', 'Printers & Ink', 20909394, 27.95, '4540'),
('Pen and pencil set', 'Oil', 40924160, 45.6, '1525'),
('New Orleans Mug', 'Kindle DX', 28323264, 44.9, '5360'),
('4 ink colour ball pen', 'Tobacco Papers', 11760294, 82.4, '4715'),
('Vibe Pen', 'Video Games', 88723081, 4.15, '2925'),
('Larkspur', 'MP3 Downloads', 83024065, 63.2, '1595'),
('WHITE MICROFIBRE LENS CLOTH', 'Grocery, Health & Beauty', 66765410, 18.4, '920'),
('CLASSIC PAPER STRING STRAW HAT ', 'Golf', 34571368, 78.3, '4640'),
('Tape measure w/ carabiner hook.', 'Athletic & Outdoor Clothing', 16948044, 34.25, '590'),
('ROUND METAL CASE FLASHLIGHT KEYTAG ', 'Home & Garden', 37676915, 78.95, '4835'),
('Cinnamon, Cassia', 'Health & Personal Care', 81889450, 64.85, '1660'),
('A4 Portfolio', 'Video Games for Kids', 21884433, 22.85, '1050'),
('Wooden Mirror', 'Natural & Organic', 67859788, 14.45, '5350');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE IF NOT EXISTS `request` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `outlet_id` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`request_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `request`
--


-- --------------------------------------------------------

--
-- Table structure for table `req_details`
--

CREATE TABLE IF NOT EXISTS `req_details` (
  `request_id` int(11) NOT NULL,
  `barcode` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`request_id`,`barcode`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `req_details`
--

