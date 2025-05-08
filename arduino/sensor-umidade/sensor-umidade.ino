int pinoSensor = A0;  // onde o sensor está ligado

void setup() {
  Serial.begin(9600);
}

void loop() {
  int leitura = analogRead(pinoSensor);  // lê o valor entre 0 e 1023
  Serial.println(leitura);  // imprime no monitor serial
  delay(1000);
}
