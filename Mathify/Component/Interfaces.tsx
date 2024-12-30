export interface Question {
    Testo: string;
    Risposte: string[];
    RispostaCorretta: string;
    Grafico:boolean;
}
export interface Sfida{
    id: string;
    questions: Question[];
    punteggioOttenuto: number;
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