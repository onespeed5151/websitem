import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // Muhasebe Soruları
  {
    id: 'q13',
    text: 'Aşağıdakilerden hangisi bir işletmenin dönen varlıkları arasında yer almaz?',
    options: ['Kasa', 'Alacak Senetleri', 'Demirbaşlar', 'Ticari Mallar'],
    correctAnswerIndex: 2,
  },
  {
    id: 'q14',
    text: 'Muhasebede, bir işlemin borç ve alacak taraflarının eşit olması prensibine ne ad verilir?',
    options: ['Süreklilik Kavramı', 'Çift Taraflı Kayıt Prensibi', 'Maliyet Esası Kavramı', 'Dönemsellik Kavramı'],
    correctAnswerIndex: 1,
  },
  {
    id: 'q15',
    text: 'Bir işletmenin belirli bir tarihteki mali durumunu gösteren tablo hangisidir?',
    options: ['Gelir Tablosu', 'Bilanço', 'Nakit Akış Tablosu', 'Özkaynak Değişim Tablosu'],
    correctAnswerIndex: 1,
  },
  {
    id: 'q16',
    text: 'Amortisman aşağıdaki varlık türlerinden hangisi için hesaplanır?',
    options: ['Nakit', 'Stoklar', 'Duran Varlıklar', 'Alacaklar'],
    correctAnswerIndex: 2,
  },
  {
    id: 'q17',
    text: 'Bir işletmenin satışlarından elde ettiği gelirden, satılan malın maliyetinin düşülmesiyle bulunan değere ne ad verilir?',
    options: ['Net Kâr', 'Faaliyet Kârı', 'Brüt Satış Kârı', 'Vergi Öncesi Kâr'],
    correctAnswerIndex: 2,
  },
  {
    id: 'q18',
    text: 'Tekdüzen Hesap Planı\'nda "100 Kasa Hesabı" hangi hesap sınıfında yer alır?',
    options: ['Dönen Varlıklar', 'Duran Varlıklar', 'Kısa Vadeli Yabancı Kaynaklar', 'Uzun Vadeli Yabancı Kaynaklar'],
    correctAnswerIndex: 0,
  },
  {
    id: 'q19',
    text: 'Bir mal satıldığında veya hizmet sunulduğunda düzenlenen belge aşağıdakilerden hangisidir?',
    options: ['Çek', 'Senet', 'Fatura', 'Makbuz'],
    correctAnswerIndex: 2,
  },
  {
    id: 'q20',
    text: 'Aşağıdakilerden hangisi bir özkaynak unsuru değildir?',
    options: ['Sermaye', 'Yedek Akçeler', 'Banka Kredileri', 'Dönem Net Kârı'],
    correctAnswerIndex: 2,
  },
  {
    id: 'q21',
    text: 'İşletmenin faaliyetleri sonucu elde ettiği gelirler ile bu gelirleri elde etmek için katlandığı giderler arasındaki farkı gösteren mali tablo hangisidir?',
    options: ['Bilanço', 'Gelir Tablosu', 'Nakit Akım Tablosu', 'Fon Akım Tablosu'],
    correctAnswerIndex: 1,
  },
  {
    id: 'q22',
    text: 'Veresiye mal alışı durumunda hangi hesap borçlandırılır?',
    options: ['100 Kasa Hs.', '153 Ticari Mallar Hs.', '320 Satıcılar Hs.', '120 Alıcılar Hs.'],
    correctAnswerIndex: 1,
  }
];
