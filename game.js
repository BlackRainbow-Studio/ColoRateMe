const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,  // Ширина экрана устройства
  height: window.innerHeight, // Высота экрана устройства
  backgroundColor: '#ffffff',
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

const game = new Phaser.Game(config);

let initialDistance = 0;  // Переменная для хранения начального расстояния между пальцами
let scale = 1;            // Переменная для хранения текущего масштаба
let backgroundColor;      // Переменная для хранения текущего цвета фона

function preload() {
  // Здесь можно загружать ресурсы, если это потребуется
}

function create() {
  // Устанавливаем начальный цвет фона
  backgroundColor = Phaser.Display.Color.RandomRGB();
  this.cameras.main.setBackgroundColor(backgroundColor);

  // Текстовая инструкция для пользователя
  this.add.text(window.innerWidth / 2, window.innerHeight / 10, 'Нажмите, чтобы изменить цвет', {
      fontSize: `${window.innerWidth / 20}px`,
      fill: '#000'
  }).setOrigin(0.5);

  // Обработчик касания для изменения цвета фона
  this.input.on('pointerdown', () => {
      changeBackgroundColor(this);
  });

  // Включаем поддержку двух касаний для масштабирования
  this.input.addPointer(2);

  // Обработчик для события перемещения пальцев (масштабирование)
  this.input.on('pointermove', (pointer) => {
      if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
          // Вычисляем расстояние между двумя пальцами
          const dist = Phaser.Math.Distance.Between(
              this.input.pointer1.x, this.input.pointer1.y,
              this.input.pointer2.x, this.input.pointer2.y
          );

          // Если это первое прикосновение, сохраняем начальное расстояние
          if (initialDistance === 0) {
              initialDistance = dist;
          } else {
              // Вычисляем новый масштаб, основываясь на соотношении текущего и начального расстояний
              scale *= dist / initialDistance;
              scale = Phaser.Math.Clamp(scale, 0.5, 2); // Ограничиваем масштаб от 0.5 до 2
              this.cameras.main.setZoom(scale); // Устанавливаем масштаб для камеры
              initialDistance = dist; // Обновляем начальное расстояние
          }
      } else {
          initialDistance = 0; // Сброс начального расстояния, если одно из касаний снято
      }
  });
}

function update() {
  // Обновление логики игры (если потребуется в будущем)
}

// Функция для смены случайного цвета фона
function changeBackgroundColor(scene) {
  // Генерация нового случайного цвета
  backgroundColor = Phaser.Display.Color.RandomRGB();
  scene.cameras.main.setBackgroundColor(backgroundColor);
}
