document.addEventListener('DOMContentLoaded', function() {
    // Obtém os parâmetros da query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const day = parseInt(urlParams.get('day'));
    const month = parseInt(urlParams.get('month'));
    const year = parseInt(urlParams.get('year'));

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        displayTimeSlots(day, month, year); // Mostra os horários para o dia selecionado
    } else {
        console.error('Parâmetros inválidos na query string.');
    }
});

function displayTimeSlots(day, month, year) {
    const slotsDiv = document.getElementById('slots');
    slotsDiv.innerHTML = ''; // Limpa o conteúdo anterior, se houver

    // Aqui você pode gerar dinamicamente os horários disponíveis
    const timeSlots = generateTimeSlots(day, month, year); // Função para gerar os horários

    // Exibe os horários na página
    timeSlots.forEach(slot => {
        const slotLink = document.createElement('a');
        slotLink.className = 'slot'; // Classe para estilização (defina em styles.css)
        slotLink.textContent = slot;
        slotLink.href = `https://api.whatsapp.com/send?phone=${encodeURIComponent('+5511987973488')}&text=Olá! Gostaria de marcar um horário.`;
        slotLink.target = '_blank'; // Abre em uma nova aba

        slotsDiv.appendChild(slotLink);
    });
}

// Função para gerar os horários disponíveis
function generateTimeSlots(day, month, year) {
    const startHour = 8; // Horário inicial (8:00 AM)
    const endHour = 18; // Horário final (6:00 PM)
    const interval = 50; // Intervalo em minutos (50 minutos)

    const slots = [];
    let currentTime = new Date(year, month, day, startHour); // Define a data baseada nos parâmetros

    while (currentTime.getHours() < endHour || (currentTime.getHours() === endHour && currentTime.getMinutes() === 0)) {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        slots.push(formattedTime);
        currentTime.setMinutes(currentTime.getMinutes() + interval);
    }
    
    return slots;
}
