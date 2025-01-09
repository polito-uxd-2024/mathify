export interface Question {
    Testo: string;
    Spiegazione:string;
    Risposte: string[];
    Soluzione: string;
    Grafico:boolean;
    GraficList:string[];
}
export interface Sfida{

    questions: Question[];
    difficoltà:number;
    argomento:string;
    titolo:string;
}
export interface Utente{
    nome:string;
    cognome:string;
    livello:{numero:number,xpTotali:number};

    sfideCompletate:SfidaCompletata[];

}
export interface SfidaCompletata{

    punteggio:number;
    tempoImpiegato:number;
    domande:QuestionDone[];
    xpGuadagnati:number;
    id:string;

}
export interface QuestionDone {
    Testo: string;
    Risposte: string[];
    RispostaCorretta: string;
    tempoImpiegato:number;
    correttezza:boolean;

}