export interface Question {
    Testo: string;
    Spiegazione:string;
    Risposte: string[];
    Soluzione: string;
    GraficList:string[];
}
/*
*/
export interface Sfida{

    questions: Question[];
    difficolta:number;
    argomento:string;
    titolo:string;
}
export interface Utente{
    nome:string;
    cognome:string;
    email:string;
    livello:{numero:number,xpTotali:number};
    verifica:boolean;
    sfideCompletate:SfidaCompletata[];


}
export interface SfidaCompletata{

    punteggio:number;
    tempoImpiegato:number;
    domande:QuestionDone[];
    xpGuadagnati:number;
    titolo:string;
    argomento:string;
    dataCompletamento:Date;
    segnalazioni:DomandaSegnalata[];


}
export interface QuestionDone {
    Testo: string;
    Risposte: string[];
    RispostaCorretta: string;
    tempoImpiegato:number;
    correttezza:boolean;
    Spiegazione:string;

}
export interface DomandaSegnalata{
    domanda:{testo:string,risposte:string[],rispostaCorretta:string},
    motivo:string,
    sfida:{titolo:string,argomento:string}
}