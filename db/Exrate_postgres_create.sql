CREATE TABLE "Bank" (
	"id" serial NOT NULL,
	"bank" VARCHAR(32) NOT NULL UNIQUE,
	"url" VARCHAR(255) NOT NULL,
	CONSTRAINT Bank_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Currency" (
	"id" serial NOT NULL,
	"name" VARCHAR(32) NOT NULL UNIQUE,
	CONSTRAINT Currency_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Data" (
	"id" serial NOT NULL,
	"bank_id" integer NOT NULL,
	"currency_id" integer NOT NULL,
	"bkbuy" FLOAT NOT NULL DEFAULT '0',
	"bksell" FLOAT NOT NULL DEFAULT '0',
	"cashbuy" FLOAT NOT NULL DEFAULT '0',
	"cashsell" FLOAT NOT NULL DEFAULT '0',
	"timestamp" TIMESTAMP NOT NULL,
	CONSTRAINT Data_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Subscribe" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL,
	"rate_id" integer NOT NULL,
	"currency_id" integer NOT NULL,
	"actionType_id" integer NOT NULL,
	"enable" varchar(2) NOT NULL DEFAULT 'Y',
	"price" FLOAT NOT NULL,
	"condition_id" integer NOT NULL,
	"timestamp" TIMESTAMP NOT NULL,
	CONSTRAINT Subscribe_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ActionType" (
	"id" serial NOT NULL,
	"type" varchar NOT NULL UNIQUE,
	CONSTRAINT ActionType_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Condition" (
	"id" serial NOT NULL,
	"condition" varchar(2) NOT NULL UNIQUE,
	CONSTRAINT Condition_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "Data" ADD CONSTRAINT "Data_fk0" FOREIGN KEY ("bank_id") REFERENCES "Bank"("id");
ALTER TABLE "Data" ADD CONSTRAINT "Data_fk1" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id");

ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_fk0" FOREIGN KEY ("rate_id") REFERENCES "Bank"("id");
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_fk1" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id");
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_fk2" FOREIGN KEY ("actionType_id") REFERENCES "ActionType"("id");
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_fk3" FOREIGN KEY ("condition_id") REFERENCES "Condition"("id");
-- init Data
INSERT INTO public."ActionType" (id,type) VALUES (1, 'bkbuy'), (2, 'bksell'), (3, 'cashbuy'), (4, 'cashsell');
INSERT INTO public."Currency" (name) VALUES
('AUD'),('CAD'),('CHF'),('CNH'),('CNY'),('CNY-IN'),('DDK'),('DKK'),('EUR'),('GBP'),('HKD'),('IDR'),('INR'),('JPY'),('KRW'),('MOP'),('MXN'),('MYR'),('NZD'),('PHP'),('SDG'),('SEK'),('SGD'),('THB'),('TRY'),('USD'),('USD-L'),('USDW'),('VND'),('ZAR');
INSERT INTO public."Condition" (id,condition) VALUES (1,'>='),(2,'<=');
INSERT INTO public."Bank" (bank,url) VALUES  
('cathaybk','https://www.cathaybk.com.tw/cathaybk/mobile/rate_01.asp'),
('fubonbk','https://ebank.taipeifubon.com.tw/B2C/cfhqu/cfhqu009/CFHQU009_Home.faces'),
('megabk','https://ebank.megabank.com.tw/global2/rs/rs02/PRS2001.faces'),
('twbk','http://rate.bot.com.tw/xrt?Lang=zh-TW'),
('chbbk','https://www.bankchb.com/chb_accessibility/G0100.jsp'),
('esunbk','https://www.esunbank.com.tw/bank/personal/deposit/rate/forex/foreign-exchange-rates'),
('taishinbk','https://www.taishinbank.com.tw/TS/TS06/TS0605/TS060502/index.htm?urlPath1=TS02&urlPath2=TS0202'),
('hncbbk','https://ibank.hncb.com.tw/netbank/pages/jsp/ExtSel/RTExange.html'),
('tcbbk','https://www.tcb-bank.com.tw/finance_info/Pages/foreign_spot_rate.aspx'),
('ctbcbk','https://www.ctbcbank.com/CTCBPortalWeb/toPage?id=TW_RB_CM_ebank_018001'),
('feibbk','https://www.feib.com.tw/financialinfo/exchangerate03.aspx'),
('sinopacbk','https://mma.sinopac.com/WebATM/html/pages/jsp/mma/bank/CurrRemittance.jsp'),
('kgibk','https://www.kgibank.com/T01/T0111/rate03.jsp'),
('tcbk','http://www.tcbank.com.tw/tw/ExchangeRate/Current'),
('entiebk','http://www.entiebank.com.tw/rate/page_host.asp'),
('scbk','http://www.entiebank.com.tw/rate/page_host.asp'),
('scsbbk','https://ibank.scsb.com.tw/netbank.portal?_nfpb=true&_pageLabel=page_other12&_nfls=false'),
('dbsbk','http://www.dbs.com.tw/personal-zh/rates/foreign-exchange-rates.page'),
('netbk','https://netbank.jihsunbank.com.tw/Rate/ExgRate.htm'),
('hsbcbk','https://www.hsbc.com.tw/1/2/Misc/popup-tw/currency-calculator'),
('firstbk','https://ibank.firstbank.com.tw/NetBank/7/0201.html?sh=none');
