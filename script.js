document.addEventListener('DOMContentLoaded', function() {
    generateCalendar(new Date().getFullYear(), new Date().getMonth()); // Gera o calendário para o mês atual
});

document.getElementById('toggleButton').addEventListener('click', function() {
    var calendar = document.getElementById('calendar');
    if (calendar.style.display === 'none' || calendar.style.display === '') {
        calendar.style.display = 'flex';
    } else {
        calendar.style.display = 'none';
    }
});

function generateCalendar(startYear, startMonth) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Limpa o conteúdo anterior

    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const endYear = 2024;
    const endMonth = 11; // Dezembro

    let currentYear = startYear;
    let currentMonth = startMonth;

    while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // Primeiro dia do mês
        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate(); // Último dia do mês

        const monthDiv = document.createElement('div');
        monthDiv.className = 'month';

        const monthTitle = document.createElement('h2');
        monthTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        monthDiv.appendChild(monthTitle);

        const daysOfWeekDiv = document.createElement('div');
        daysOfWeekDiv.className = 'days-of-week';
        ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = day;
            daysOfWeekDiv.appendChild(dayDiv);
        });
        monthDiv.appendChild(daysOfWeekDiv);

        const daysDiv = document.createElement('div');
        daysDiv.className = 'days';
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'day';
            daysDiv.appendChild(emptyDiv);
        }
        for (let i = 1; i <= lastDate; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            
            const button = document.createElement('button');
            button.textContent = i;
            button.className = 'day-button';
            button.addEventListener('click', function() {
                // Mostra os horários disponíveis para o dia clicado
                window.location.href = `horarios.html?day=${i}&month=${currentMonth}&year=${currentYear}`;
            });
            
            dayDiv.appendChild(button);
            daysDiv.appendChild(dayDiv);
        }
        monthDiv.appendChild(daysDiv);

        calendar.appendChild(monthDiv);

        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        } 
    }
}
