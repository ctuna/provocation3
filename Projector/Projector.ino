/*
  AnalogReadSerial
 Reads an analog input on pin 0, prints the result to the serial monitor.
 Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.
 
 This example code is in the public domain.
 */
int ledPin = 13;  
String msg;

String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  while (!Serial) {;}
}

// the loop routine runs over and over again forever:
void loop() {
  
  while (Serial.available()){
   
    char inChar = (char)Serial.read(); 
    if (inChar == '\n') {
      stringComplete = true;
      postString();
      
    }
    else append(inChar);
  }
} 
   

void append(char c){
  inputString += c; 
}


void blinkLights(){
   for (int i = 0; i < 5; i++){
    digitalWrite(ledPin, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(50);               // wait for a second
    digitalWrite(ledPin, LOW);   // turn the LED on (HIGH is the voltage level)
    delay(50);  
   }
  }

void postString(){
  if (inputString=="blink"){
    blinkLights();
  }
  Serial.println(inputString);
  inputString = "";
  //reset input string
}
