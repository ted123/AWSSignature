'use strict';
var http    = require( 'http' );
var request = require( 'request' );
var port    = 8080;

var AWSSignatureUtils = require('./aws_signature_utils');

var aws_params = {
	aws_endpoint   : 'authorize.payments-sandbox.amazon.com',
	aws_secret_key : 'XoUzoIwPgv1ovtJNEnZNwxKOveEUuuKwik20kdVg',
	uri            : '/OffAmazonPayments_Sandbox/2013-01-01',
	verb           : 'POST',
	host           : 'mws.amazonservices.com',
	parameters     : {
		AWSAccessKeyId           : 'AKIAJEHWDHYQRY6FWWG',
		AmazonBillingAgreementId : 'C01-6270230-8663330',
		Action                   : 'ConfirmBillingAgreement',
		MWSAuthToken             : 'amzn.mws.4aa6db92-f9cc-06ef-4dee-123a8b38497d',
		SellerId                 : 'A2K6959CQVB4WH',
		SignatureMethod          : 'HmacSHA256',
		SignatureVersion         : '2',
		Timestamp                : (new Date).toISOString(),
		Version                  : '2013-01-01'
	}
};

var server = http.createServer();

server.listen( port, function () {
	console.log( 'server running at port:' + port );
	var requestString = 'https://mws.amazonservices.com/OffAmazonPayments_Sandbox/2013-01-01?' +
		'AWSAccessKeyId=' + aws_params.parameters.AWSAccessKeyId +
		'&AmazonBillingAgreementId='+ aws_params.parameters.AmazonBillingAgreementId +
		'&Action=' + aws_params.parameters.Action +
		'&MWSAuthToken=' + aws_params.parameters.MWSAuthToken +
		'&SellerId=' + aws_params.parameters.SellerId + 
		'&SignatureMethod=' + aws_params.parameters.SignatureMethod + 
		'&SignatureVersion=' + aws_params.parameters.SignatureVersion +
		'&Timestamp=' + encodeURIComponent(aws_params.parameters.Timestamp) +
		'&Version=' + aws_params.parameters.Version +
		'&Signature=' + encodeURIComponent(AWSSignatureUtils.sign_parameters(aws_params));
	
	request.post( requestString, function (err, res, body) {
		console.log( body  );
	} );
} )