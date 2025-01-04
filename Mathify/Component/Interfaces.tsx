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
    id:string;
    nome:string;
    cognome:string;
    livello:{numero:number,xpTotali:number};
    xp:number;
    sfideCompletate:SfidaCompletata[];

}
export interface SfidaCompletata{
    sfida:Sfida;
    punteggio:number;
    tempoImpiegato:number;
    domande:QuestionDone[];
    xpGuadagnati:number;

}
export interface QuestionDone {
    Testo: string;
    Risposte: string[];
    RispostaCorretta: string;
    tempoImpiegato:number;
    correttezza:boolean;
}