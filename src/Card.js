import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Card = () =>{

    const [start,setStart]= useState(true)
    let [value,setValue]=useState(0)
    let [playervalue,setPlayervalue] = useState(0)

    const [player,setPlayer] = useState([])
    const [dealer,setDealer] = useState([])
    const card = ["A",2,3,4,5,6,7,8,9,"J","Q","K"]
    const cardname = ["S","C","H","D"]
    const [result,setResult] = useState("")
    const [modal,setModal] = useState(false)
    const [hit,setHit] = useState(false)

    const Random = () =>{
        if(start===true){
            let tempplayer = [...player]
            let tempdealer = [...dealer]
            for(let i=0 ; i<2 ; i++){
                let randomnumber = Math.floor(Math.random()*card.length);
                let cardnumber = card[randomnumber]
                let randomname = Math.floor(Math.random()*cardname.length);
                let cardnames = cardname[randomname]
                let combine = cardnumber+cardnames
                tempplayer.push(combine)
            }
            let randomnumber = Math.floor(Math.random()*card.length);
            let cardnumber = card[randomnumber]
            let randomname = Math.floor(Math.random()*cardname.length);
            let cardnames = cardname[randomname]
            let combine = cardnumber+cardnames
            tempdealer.push(combine)
            setDealer(tempdealer)
            setPlayer(tempplayer)
            setStart(false)
            for(let i=0 ; i<tempdealer.length;i++){
                let number = tempdealer[i]
                if(Number.isInteger(parseInt(number[0]))===false){
                    if(number[0]!=="A"){
                        setValue(value+=10);
                    }
                    else if(number[0] === "A"){
                        if(value>11){
                            setValue(value+=1)
                        }
                        else if(value<11){
                            setValue(value+=11)
                        }
                    }
                }
                else if(Number.isInteger(parseInt(number[0])))
                {
                    setValue(value+=parseInt(number[0]))
                }
            }
            for(let i=0 ; i<tempplayer.length;i++){
                let number = tempplayer[i]
                if(Number.isInteger(parseInt(number[0]))===false){
                    if(number[0]!=="A"){
                    setPlayervalue(playervalue+=10);
                        }
                        else if(number[0] === "A"){
                            if(value>11){
                                setPlayervalue(playervalue+=1)
                            }
                            else if(value<11){
                                setPlayervalue(playervalue+=11)
                            }
                        }
                    }
                    else if(Number.isInteger(parseInt(number[0])))
                    {
                        setPlayervalue(playervalue+=parseInt(number[0]))
                    }
                }
        }
    } 

    const Dealer = () =>{
        let tempdealer = [...dealer]
        setHit(true)
            if(value<16)
            {
                let randomnumber = Math.floor(Math.random()*card.length);
                let cardnumber = card[randomnumber]
                let randomname = Math.floor(Math.random()*cardname.length);
                let cardnames = cardname[randomname]
                let combine = cardnumber+cardnames
                tempdealer.push(combine)
                value=0
                for(let i=0 ; i<tempdealer.length;i++){
                    let number = tempdealer[i]
                    if(Number.isInteger(parseInt(number[0]))===false){
                        if(number[0]!=="A"){
                            setValue(value+=10);
                        }
                        else if(number[0] === "A"){
                            if(value>11){
                                setValue(value+=1)
                            }
                            else if(value<11){
                                setValue(value+=11)
                            }
                        }
                    }
                    else if(Number.isInteger(parseInt(number[0])))
                    {
                        setValue(value+=parseInt(number[0]))
                    }
                }
            }
            setDealer(tempdealer)
    }

    const Player = () =>{
        if(playervalue<21)
        {let tempplayer = [...player]
        let randomnumber = Math.floor(Math.random()*card.length);
        let cardnumber = card[randomnumber]
        let randomname = Math.floor(Math.random()*cardname.length);
        let cardnames = cardname[randomname]
        let combine = cardnumber+cardnames
        tempplayer.push(combine)
        playervalue=0
        for(let i=0 ; i<tempplayer.length;i++){
            let number = tempplayer[i]
            if(Number.isInteger(parseInt(number[0]))===false){
                if(number[0]!=="A"){
                setPlayervalue(playervalue+=10);
                    }
                    else if(number[0] === "A"){
                        if(value>=11){
                            setPlayervalue(playervalue+=1)
                        }
                        else if(value<11){
                            setPlayervalue(playervalue+=11)
                        }
                    }
                }
                else if(Number.isInteger(parseInt(number[0])))
                {
                    setPlayervalue(playervalue+=parseInt(number[0]))
                }
            }
            setPlayer(tempplayer)
        }        
}

useEffect(()=>{
    if(playervalue>21){
        setResult("You Busted")
        setModal(true)
    }
    else if(value>21){
        setResult("You Won")
        setModal(true)
    }
    else if(value>=16){
        if(value>playervalue){
            setResult("Lost the Match")
            setModal(true)
        }
        else if(value<playervalue){
            setResult("You Won")
            setModal(true)
        }
        else if(value === playervalue){
            setResult("Draw")
            setModal(true)
        }
    }
},[playervalue,value])

const Reset = () =>{
    setStart(true)
    setValue(0)
    setPlayervalue(0)
    setPlayer([])
    setDealer([])
    setResult("")
    setModal(false)
    setHit(false)
}
    return(
        <div className="parent">
            <Modal isOpen={modal}>
                <ModalBody>
                    {result}
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={Reset}>Cancel</Button>
                </ModalFooter>
            </Modal>
            {start &&<Button onClick={Random}>StartGame</Button>}
            {!start&&<div className="gameborder">
                <div className="dealer">
                    <h3>Dealer({value}){value===21&&dealer.length===2?"BlackJack":""}</h3>
                    <div className="cards">
                        {dealer.map((item)=>
                            <div className="cardborderdealer">{item}</div>
                        )}
                    </div>
                </div>
                <div className="player">
                    <h3>Player({playervalue}){playervalue===21&&player.length===2?"BlackJack":""}</h3>
                    <div className="cards">
                        {player.map((item)=>
                            <div className="cardborderplayer">{item}</div>
                        )}
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"row" ,width:"50%" ,justifyContent:"space-evenly"}}>
                <Button onClick={Player} disabled={hit}>Hit</Button>
                <Button onClick={Dealer} >Strike</Button>
                </div>
            </div>}
        </div>
    )
}

export default Card;