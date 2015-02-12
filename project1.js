/*
 *
 * Written By: Dalton Wallace
 * UNID: U0561493
 *
 * All of the multiplication algorithms must split the numbers into two pieces with almost equal number of digits.
 *
 * You are not permitted to use addition or multiplication operations of JavaScript for numbers with more than a single digit.
 * 
 * The returned results for all operations must be correct.
 * 
 * The input numbers can have different number of digits.
 *
 */

function GetName()
{
	return "Dalton Wallace";
}

function GetUNID()
{
	return "U0561493";
}


/*
 *
 * Implement the JavaScript function GradeSchoolAdd(x,y) that returns the sum of two numbers. It should have O(n) complexity.
 *
 */
function GradeSchoolAdd(x,y)
{
	var result = "";
	var xPos = x.length - 1;
	var yPos = y.length - 1;
	var carry = 0;

	while(xPos >= 0 && yPos >= 0)
	{
		// Perform additionImplement the JavaScript function GradeSchoolAdd(x,y) that returns the sum of two numbers. It should have O(n) complexity.
		var xDigit = parseInt(x.charAt(xPos));
		var yDigit = parseInt(y.charAt(yPos));

		var currentResult = xDigit + yDigit + carry; 

		if(currentResult > 9)
		{
			carry = 1;
			result = (currentResult - 10) + result;
		}
		else
		{
			carry = 0;
			result = currentResult + result;
		}

		xPos--;
		yPos--;
	}

	while(xPos >= 0)
	{

		var xDigit = parseInt(x.charAt(xPos));

		var currentResult = xDigit + carry; 

		if(currentResult > 9)
		{
			carry = 1;
			result = (currentResult - 10) + result;
		}
		else
		{
			carry = 0;
			result = currentResult + result;
		}

		xPos--;
	}

	while(yPos >= 0)
	{

		var yDigit = parseInt(y.charAt(yPos));

		var currentResult = yDigit + carry; 

		if(currentResult > 9)
		{
			carry = 1;
			result = (currentResult - 10) + result;
		}
		else
		{
			carry = 0;
	 		result = currentResult + result;
		}

		yPos--;
	}

	if(carry)
	{
		result = "1" + result;
	}

	return result;
}


/*
 *
 * Implement the JavaScript function GradeSchoolMultiply(x,y) that returns the product of the two numbers using the recursive Grade S * chool Multiplication we discussed in class. It should have O(n2) complexity
 *
 */
function GradeSchoolMultiply(x,y)
{

	while(x.length > y.length)
	{
		y = "0" + y;
	}
	while(y.length > x.length)
	{
		x = "0" + x;
	}

	var maxN = x.length;

	if(maxN === 1)
	{
		return (parseInt(x)*parseInt(y)).toString();
	}

	if(x.length % 2 == 1)
	{
		x = "0" + x;
		y = "0" + y;

		maxN++;
	}

	var cutOff = (maxN / 2);	

	var xLeft = leftmost(cutOff, x);
	var xRight = rightmost(cutOff, x);
	var yLeft = leftmost(cutOff, y);
	var yRight = rightmost(cutOff, y);

	var xLeftyLeft = GradeSchoolMultiply(xLeft, yLeft);
	var xLeftyRight = GradeSchoolMultiply(xLeft, yRight);
	var xRightyLeft = GradeSchoolMultiply(xRight, yLeft);
	var xRightyRight = GradeSchoolMultiply(xRight, yRight);

	var result1 = xLeftyLeft + powerOfTen(maxN);
	var result2 = GradeSchoolAdd(xLeftyRight, xRightyLeft) + powerOfTen(cutOff);
	var result3 = GradeSchoolAdd(result1, result2);


	return removeLeadingZeros(GradeSchoolAdd(result3, xRightyRight));
}


/*
 *
 * Implement the JavaScript function KarscriptatsubasMultiply(x,y) that returns the product of the two numbers using Karatsuba's Multiplica * tion.
 * 
 */
function KaratsubasMultiply(x,y)
{
	while(x.length > y.length)
	{
		y = "0" + y;
	}
	while(y.length > x.length)
	{
		x = "0" + x;
	}

	var maxN = x.length;

	if(maxN === 1)
	{
		return (parseInt(x)*parseInt(y)).toString();
	}

	if(x.length % 2 == 1)
	{
		x = "0" + x;
		y = "0" + y;

		maxN++;
	}

	var cutOff = (maxN / 2);	

	var xLeft = leftmost(cutOff, x);
	var xRight = rightmost(cutOff, x);
	var yLeft = leftmost(cutOff, y);
	var yRight = rightmost(cutOff, y);

	var p1 = KaratsubasMultiply(xLeft, yLeft);
	var p2 = KaratsubasMultiply(xRight, yRight);
	
	var xLeftRight = GradeSchoolAdd(xLeft, xRight);
	
	var yLeftRight = GradeSchoolAdd(yLeft, yRight);

	var p3 = KaratsubasMultiply(xLeftRight, yLeftRight);

	var result1 = p1 + powerOfTen(maxN);
	var p3MenoP1 = GradeSchoolSubtract(p3, p1);
	var p3MenoP1MenoP2 = GradeSchoolSubtract(p3MenoP1, p2);
	var result2 = p3MenoP1MenoP2 + powerOfTen(cutOff);
	var result3 = GradeSchoolAdd(result1, result2);

	return removeLeadingZeros(GradeSchoolAdd(result3, p2));

}

function GradeSchoolSubtract(x, y)
{
	var result = "";
	var xPos = x.length - 1;
	var yPos = y.length - 1;
	var carry = 0;

	while(xPos >= 0 && yPos >= 0)
	{
		// Perform additionImplement the JavaScript function GradeSchoolAdd(x,y) that returns the sum of two numbers. It should have O(n) complexity.
		var xDigit = parseInt(x.charAt(xPos));
		var yDigit = parseInt(y.charAt(yPos));

		var currentResult = xDigit - yDigit + carry; 

		if(currentResult < 0)
		{
			carry = -1;
			result = (currentResult + 10) + result;
		}
		else
		{
			carry = 0;
			result = currentResult + result;
		}

		xPos--;
		yPos--;
	}

	while(xPos >= 0)
	{

		var xDigit = parseInt(x.charAt(xPos));

		var currentResult = xDigit + carry; 

		if(currentResult < 0)
		{
			carry = -1;
			result = (currentResult + 10) + result;
		}
		else
		{
			carry = 0;
			result = currentResult + result;
		}

		xPos--;
	}

	while(yPos >= 0)
	{

		var yDigit = parseInt(y.charAt(yPos));

		var currentResult = yDigit + carry; 

		if(currentResult < 0)
		{
			carry = -1;
			result = (currentResult + 10) + result;
		}
		else
		{
			carry = 0;
	 		result = currentResult + result;
		}

		yPos--;
	}

	if(carry)
	{
		result = "1" + result;
	}

	return removeLeadingZeros(result);

}

/*
 *
 *Implement BlendedMultiply(x,y,threshold) that returns the product of the two numbers using Blended Multiplication with the given threshold value.
 *
 */
function BlendedMultiply(x, y, threshold)
{
	while(x.length > y.length)
	{
		y = "0" + y;
	}
	while(y.length > x.length)
	{
		x = "0" + x;
	}
	
	var maxN = x.length;
	
	if(maxN === 1)
	{
		return (parseInt(x)*parseInt(y)).toString();
	}

	if(x.length % 2 == 1)
	{
		x = "0" + x;
		y = "0" + y;

		maxN++;
	}

	var cutOff = (maxN / 2);	
	
	var xLeft = leftmost(cutOff, x);
	var xRight = rightmost(cutOff, x);
	var yLeft = leftmost(cutOff, y);
	var yRight = rightmost(cutOff, y);

	// While greater than the threshold, perform Karatsubas
	if(x.length > threshold)
	{
		// Karatsubas Multiplication
		
		var p1 = BlendedMultiply(xLeft, yLeft, threshold);
		var p2 = BlendedMultiply(xRight, yRight, threshold);
		
		var xLeftRight = GradeSchoolAdd(xLeft, xRight);
		
		var yLeftRight = GradeSchoolAdd(yLeft, yRight);

		var p3 = BlendedMultiply(xLeftRight, yLeftRight, threshold);

		var result1 = p1 + powerOfTen(maxN);
		var p3MenoP1 = GradeSchoolSubtract(p3, p1);
		var p3MenoP1MenoP2 = GradeSchoolSubtract(p3MenoP1, p2);
		var result2 = p3MenoP1MenoP2 + powerOfTen(cutOff);
		var result3 = GradeSchoolAdd(result1, result2);

		return removeLeadingZeros(GradeSchoolAdd(result3, p2));
		
	}
	else
	{
		// Grade School Multiplication
		
		var xLeftyLeft = BlendedMultiply(xLeft, yLeft, threshold);
		var xLeftyRight = BlendedMultiply(xLeft, yRight, threshold);
		var xRightyLeft = BlendedMultiply(xRight, yLeft, threshold);
		var xRightyRight = BlendedMultiply(xRight, yRight, threshold);

		var result1 = xLeftyLeft + powerOfTen(maxN);
		var result2 = GradeSchoolAdd(xLeftyRight, xRightyLeft) + powerOfTen(cutOff);
		var result3 = GradeSchoolAdd(result1, result2);

		
		return removeLeadingZeros(GradeSchoolAdd(result3, xRightyRight));
	}
	
}

/*
 *
 * Implement the JavaScript function GetOptimalBlendedThreshold() that returns the optimal threshold value. You must determine this t * hreshold value using your experiments using numbers with 1000 or more digits.
 *
 */
function GetOptimalBlendedThreshold()
{
	return "4";
}


// HELPER FUNCTIONS

function removeLeadingZeros(word)
{
	while(word.length > 1)
	{
		if(word.charAt(0) === '0')
		{
			word = word.substring(1);
		}
		else
		{
			return word;
		}
	}

	return word;
}

function powerOfTen(exponent)
{
	var temp = "";
	for(var power = 0; power < exponent; power++)
	{
		temp += "0";
	}

	return temp;
}

function leftmost(numBits, num)
{
	return num.substring(0, numBits);
}

function rightmost(numBits, num)
{
	return num.substring(numBits, num.length)
}



